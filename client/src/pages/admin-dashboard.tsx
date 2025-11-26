import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, LogOut, Mail, Calendar, Eye, Home, Users, Briefcase, Video, Brain, MessageSquare, Settings, Menu, Plus, Edit, Trash2, GripVertical, FileText } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import type { Project, Video as VideoType, AiModel, ContactMessage } from "../../../shared/schema";
import WhatsAppSettings from "@/components/admin/whatsapp-settings";
import { BlogManagement } from "@/components/admin/BlogManagement";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable Row Component
function SortableProjectRow({ project, onEdit, onDelete }: { project: Project; onEdit: (project: Project) => void; onDelete: (id: number) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell>
        <div className="flex items-center cursor-move" {...attributes} {...listeners}>
          <GripVertical className="w-4 h-4 text-gray-400" />
          <span className="ml-2">{project.orderIndex}</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">{project.title}</TableCell>
      <TableCell>{project.category}</TableCell>
      <TableCell>
        {project.link ? (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Linki Görüntüle
          </a>
        ) : '-'}
      </TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(project)}
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(project.id)}
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingVideo, setEditingVideo] = useState<VideoType | null>(null);
  const [editingAiModel, setEditingAiModel] = useState<AiModel | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [projectImageUrl, setProjectImageUrl] = useState<string>("");
  const [videoThumbnailUrl, setVideoThumbnailUrl] = useState<string>("");
  const projectImageInputRef = useRef<HTMLInputElement>(null);
  const videoThumbnailInputRef = useRef<HTMLInputElement>(null);

  // Check if user is authenticated
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["/api/user"],
    retry: false,
  });

  // Get all data
  const { data: messages = [] } = useQuery<ContactMessage[]>({
    queryKey: ["/api/admin/messages"],
    enabled: !!user,
  });

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    enabled: !!user,
  });

  const { data: videos = [] } = useQuery<VideoType[]>({
    queryKey: ["/api/videos"],
    enabled: !!user,
  });

  const { data: aiModels = [] } = useQuery<AiModel[]>({
    queryKey: ["/api/ai-models"],
    enabled: !!user,
  });

  useEffect(() => {
    if (!userLoading && !user) {
      toast({
        title: "Yetkisiz Erişim",
        description: "Bu sayfaya erişim yetkiniz yok.",
        variant: "destructive",
      });
      setLocation("/admin");
    }
  }, [user, userLoading, toast, setLocation]);

  // Reset image URLs when dialogs open/close
  useEffect(() => {
    if (!editingProject) {
      setProjectImageUrl("");
    } else if (editingProject.image) {
      setProjectImageUrl(editingProject.image);
    }
  }, [editingProject]);

  useEffect(() => {
    if (!editingVideo) {
      setVideoThumbnailUrl("");
    } else if (editingVideo.thumbnail) {
      setVideoThumbnailUrl(editingVideo.thumbnail);
    }
  }, [editingVideo]);

  // Mutations
  const createProjectMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/admin/projects", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Başarılı", description: "Proje eklendi." });
      setEditingProject(null);
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => 
      apiRequest("PUT", `/api/admin/projects/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Başarılı", description: "Proje güncellendi." });
      setEditingProject(null);
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Başarılı", description: "Proje silindi." });
    },
  });

  // Similar mutations for videos and AI models
  const createVideoMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/admin/videos", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
      toast({ title: "Başarılı", description: "Video eklendi." });
      setEditingVideo(null);
    },
  });

  const updateVideoMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => 
      apiRequest("PUT", `/api/admin/videos/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
      toast({ title: "Başarılı", description: "Video güncellendi." });
      setEditingVideo(null);
    },
  });

  const deleteVideoMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/videos/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
      toast({ title: "Başarılı", description: "Video silindi." });
    },
  });

  const createAiModelMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/admin/ai-models", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ai-models"] });
      toast({ title: "Başarılı", description: "AI modeli eklendi." });
      setEditingAiModel(null);
    },
  });

  const updateAiModelMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => 
      apiRequest("PUT", `/api/admin/ai-models/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ai-models"] });
      toast({ title: "Başarılı", description: "AI modeli güncellendi." });
      setEditingAiModel(null);
    },
  });

  const deleteAiModelMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/ai-models/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ai-models"] });
      toast({ title: "Başarılı", description: "AI modeli silindi." });
    },
  });

  // File upload handler
  const handleImageUpload = async (file: File, type: 'project' | 'video') => {
    setUploadingImage(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      
      if (type === 'project') {
        setProjectImageUrl(data.url);
      } else {
        setVideoThumbnailUrl(data.url);
      }
      
      toast({
        title: "Başarılı",
        description: "Resim yüklendi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Resim yüklenemedi.",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  // Drag and drop handlers
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleProjectDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = projects.findIndex((p: Project) => p.id === active.id);
      const newIndex = projects.findIndex((p: Project) => p.id === over.id);

      const newProjects = arrayMove(projects, oldIndex, newIndex);
      
      // Optimistically update the UI
      queryClient.setQueryData<Project[]>(['/api/projects'], newProjects.map((p, index) => ({
        ...p,
        orderIndex: index
      })));
      
      // Update each project's order on the server
      newProjects.forEach((project: Project, index: number) => {
        if (project.orderIndex !== index) {
          updateProjectMutation.mutate({ 
            id: project.id, 
            data: { orderIndex: index } 
          });
        }
      });
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        toast({
          title: "Başarılı",
          description: "Çıkış yapıldı.",
        });
        setLocation("/");
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: "Çıkış yapılırken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleProjectSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      link: formData.get("link") as string || null,
      image: projectImageUrl || formData.get("image") as string || null,
      category: formData.get("category") as string,
      orderIndex: parseInt(formData.get("orderIndex") as string || "0"),
    };

    if (editingProject?.id) {
      updateProjectMutation.mutate({ id: editingProject.id, data });
    } else {
      createProjectMutation.mutate(data);
    }
    setProjectImageUrl("");
  };

  const handleVideoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string || null,
      videoUrl: formData.get("videoUrl") as string,
      thumbnail: videoThumbnailUrl || formData.get("thumbnail") as string || null,
      orderIndex: parseInt(formData.get("orderIndex") as string || "0"),
    };

    if (editingVideo?.id) {
      updateVideoMutation.mutate({ id: editingVideo.id, data });
    } else {
      createVideoMutation.mutate(data);
    }
    setVideoThumbnailUrl("");
  };

  const handleAiModelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const features = (formData.get("features") as string || "").split("\n").filter(f => f.trim());
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      features: features,
      icon: formData.get("icon") as string || null,
      orderIndex: parseInt(formData.get("orderIndex") as string || "0"),
    };

    if (editingAiModel?.id) {
      updateAiModelMutation.mutate({ id: editingAiModel.id, data });
    } else {
      createAiModelMutation.mutate(data);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "messages", label: "Mesajlar", icon: MessageSquare },
    { id: "projects", label: "Projeler", icon: Briefcase },
    { id: "videos", label: "Video Yönetimi", icon: Video },
    { id: "ai-models", label: "AI Modelleri", icon: Brain },
    { id: "blog", label: "Blog Yönetimi", icon: FileText },
    { id: "settings", label: "Ayarlar", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-blue-700 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between">
          <div className={`flex items-center space-x-3 ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 bg-white text-blue-700 rounded-lg flex items-center justify-center font-bold text-lg">
              3
            </div>
            {sidebarOpen && (
              <>
                <div>
                  <h2 className="font-bold">Third Hand</h2>
                  <p className="text-xs text-blue-200">Admin Panel</p>
                </div>
              </>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-blue-600"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center ${sidebarOpen ? 'space-x-3' : 'justify-center'} px-3 py-2 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-blue-200 hover:bg-blue-600 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-blue-600">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={`w-full text-blue-200 hover:text-white hover:bg-blue-600 ${!sidebarOpen && 'px-0'}`}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Çıkış Yap</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
            </h1>
            <p className="text-gray-600">
              Hoş geldiniz! Buradan web sitenizi yönetebilirsiniz.
            </p>
          </div>

          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Toplam Mesaj</CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{messages.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Projeler</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{projects.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Videolar</CardTitle>
                  <Video className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{videos.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Modelleri</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{aiModels.length}</div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <Card>
              <CardHeader>
                <CardTitle>Gelen Mesajlar</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ad Soyad</TableHead>
                      <TableHead>E-posta</TableHead>
                      <TableHead>Konu</TableHead>
                      <TableHead>Tarih</TableHead>
                      <TableHead>İşlem</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.map((message) => (
                      <TableRow key={message.id}>
                        <TableCell className="font-medium">{message.name}</TableCell>
                        <TableCell>{message.email}</TableCell>
                        <TableCell>{message.subject}</TableCell>
                        <TableCell>
                          {format(new Date(message.createdAt || ''), "dd MMMM yyyy", { locale: tr })}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedMessage(message)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Projeler</h2>
                <Button onClick={() => setEditingProject({} as Project)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Yeni Proje Ekle
                </Button>
              </div>
              <Card>
                <CardContent className="p-0">
                  <DndContext 
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleProjectDragEnd}
                  >
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">Sıra</TableHead>
                          <TableHead>Başlık</TableHead>
                          <TableHead>Kategori</TableHead>
                          <TableHead>Link</TableHead>
                          <TableHead className="text-right">İşlemler</TableHead>
                        </TableRow>
                      </TableHeader>
                      <SortableContext 
                        items={projects.map(p => p.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        <TableBody>
                          {projects.map((project) => (
                            <SortableProjectRow
                              key={project.id}
                              project={project}
                              onEdit={setEditingProject}
                              onDelete={deleteProjectMutation.mutate}
                            />
                          ))}
                        </TableBody>
                      </SortableContext>
                    </Table>
                  </DndContext>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Videos Tab */}
          {activeTab === "videos" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Videolar</h2>
                <Button onClick={() => setEditingVideo({} as VideoType)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Yeni Video Ekle
                </Button>
              </div>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">Sıra</TableHead>
                        <TableHead>Başlık</TableHead>
                        <TableHead>Video URL</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {videos.map((video) => (
                        <TableRow key={video.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <GripVertical className="w-4 h-4 text-gray-400" />
                              <span className="ml-2">{video.orderIndex}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{video.title}</TableCell>
                          <TableCell>
                            <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              Videoyu Görüntüle
                            </a>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingVideo(video)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteVideoMutation.mutate(video.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* AI Models Tab */}
          {activeTab === "ai-models" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">AI Modelleri</h2>
                <Button onClick={() => setEditingAiModel({} as AiModel)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Yeni Model Ekle
                </Button>
              </div>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">Sıra</TableHead>
                        <TableHead>Model Adı</TableHead>
                        <TableHead>Özellik Sayısı</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {aiModels.map((model) => (
                        <TableRow key={model.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <GripVertical className="w-4 h-4 text-gray-400" />
                              <span className="ml-2">{model.orderIndex}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{model.name}</TableCell>
                          <TableCell>{(model.features as string[]).length} özellik</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingAiModel(model)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteAiModelMutation.mutate(model.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Blog Tab */}
          {activeTab === "blog" && (
            <BlogManagement />
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <WhatsAppSettings />
          )}
        </div>
      </div>

      {/* Message Detail Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Mesaj Detayı</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div>
                <Label>Ad Soyad</Label>
                <p className="text-sm text-gray-700">{selectedMessage.name}</p>
              </div>
              <div>
                <Label>E-posta</Label>
                <p className="text-sm text-gray-700">{selectedMessage.email}</p>
              </div>
              <div>
                <Label>Konu</Label>
                <p className="text-sm text-gray-700">{selectedMessage.subject}</p>
              </div>
              <div>
                <Label>Mesaj</Label>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <div>
                <Label>Tarih</Label>
                <p className="text-sm text-gray-700">
                  {format(new Date(selectedMessage.createdAt || ''), "dd MMMM yyyy HH:mm", { locale: tr })}
                </p>
              </div>
              {selectedMessage.privacyAccepted && (
                <Badge variant="outline" className="mt-2">
                  Gizlilik sözleşmesi kabul edildi
                </Badge>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Project Edit Dialog */}
      <Dialog open={!!editingProject} onOpenChange={() => setEditingProject(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingProject?.id ? 'Proje Düzenle' : 'Yeni Proje Ekle'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleProjectSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Başlık</Label>
              <Input
                id="title"
                name="title"
                defaultValue={editingProject?.title}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={editingProject?.description}
                required
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="category">Kategori</Label>
              <Input
                id="category"
                name="category"
                defaultValue={editingProject?.category}
                required
              />
            </div>
            <div>
              <Label htmlFor="link">Link (Opsiyonel)</Label>
              <Input
                id="link"
                name="link"
                type="url"
                defaultValue={editingProject?.link || ''}
              />
            </div>
            <div>
              <Label htmlFor="image">Resim</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    value={projectImageUrl || editingProject?.image || ''}
                    onChange={(e) => setProjectImageUrl(e.target.value)}
                    placeholder="Resim URL'si veya dosya yükleyin"
                  />
                  <input
                    ref={projectImageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, 'project');
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => projectImageInputRef.current?.click()}
                    disabled={uploadingImage}
                  >
                    {uploadingImage ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Yükle'
                    )}
                  </Button>
                </div>
                {(projectImageUrl || editingProject?.image) && (
                  <div className="relative w-full h-32 border rounded overflow-hidden">
                    <img 
                      src={projectImageUrl || editingProject?.image || ''} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="orderIndex">Sıralama</Label>
              <Input
                id="orderIndex"
                name="orderIndex"
                type="number"
                defaultValue={editingProject?.orderIndex || 0}
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditingProject(null)}>
                İptal
              </Button>
              <Button type="submit" disabled={createProjectMutation.isPending || updateProjectMutation.isPending}>
                {(createProjectMutation.isPending || updateProjectMutation.isPending) && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {editingProject?.id ? 'Güncelle' : 'Ekle'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Video Edit Dialog */}
      <Dialog open={!!editingVideo} onOpenChange={() => setEditingVideo(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingVideo?.id ? 'Video Düzenle' : 'Yeni Video Ekle'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleVideoSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Başlık</Label>
              <Input
                id="title"
                name="title"
                defaultValue={editingVideo?.title}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Açıklama (Opsiyonel)</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={editingVideo?.description || ''}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                name="videoUrl"
                type="url"
                defaultValue={editingVideo?.videoUrl}
                required
              />
            </div>
            <div>
              <Label htmlFor="thumbnail">Thumbnail</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    id="thumbnail"
                    name="thumbnail"
                    type="url"
                    value={videoThumbnailUrl || editingVideo?.thumbnail || ''}
                    onChange={(e) => setVideoThumbnailUrl(e.target.value)}
                    placeholder="Thumbnail URL'si veya dosya yükleyin"
                  />
                  <input
                    ref={videoThumbnailInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, 'video');
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => videoThumbnailInputRef.current?.click()}
                    disabled={uploadingImage}
                  >
                    {uploadingImage ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Yükle'
                    )}
                  </Button>
                </div>
                {(videoThumbnailUrl || editingVideo?.thumbnail) && (
                  <div className="relative w-full h-32 border rounded overflow-hidden">
                    <img 
                      src={videoThumbnailUrl || editingVideo?.thumbnail || ''} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="orderIndex">Sıralama</Label>
              <Input
                id="orderIndex"
                name="orderIndex"
                type="number"
                defaultValue={editingVideo?.orderIndex || 0}
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditingVideo(null)}>
                İptal
              </Button>
              <Button type="submit" disabled={createVideoMutation.isPending || updateVideoMutation.isPending}>
                {(createVideoMutation.isPending || updateVideoMutation.isPending) && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {editingVideo?.id ? 'Güncelle' : 'Ekle'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* AI Model Edit Dialog */}
      <Dialog open={!!editingAiModel} onOpenChange={() => setEditingAiModel(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingAiModel?.id ? 'AI Modeli Düzenle' : 'Yeni AI Modeli Ekle'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAiModelSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Model Adı</Label>
              <Input
                id="name"
                name="name"
                defaultValue={editingAiModel?.name}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={editingAiModel?.description}
                required
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="features">Özellikler (Her satıra bir özellik)</Label>
              <Textarea
                id="features"
                name="features"
                defaultValue={editingAiModel?.features ? (editingAiModel.features as string[]).join('\n') : ''}
                rows={5}
                placeholder="Özellik 1&#10;Özellik 2&#10;Özellik 3"
              />
            </div>
            <div>
              <Label htmlFor="icon">İkon (Opsiyonel)</Label>
              <Input
                id="icon"
                name="icon"
                defaultValue={editingAiModel?.icon || ''}
                placeholder="lucide-react icon adı (örn: Brain)"
              />
            </div>
            <div>
              <Label htmlFor="orderIndex">Sıralama</Label>
              <Input
                id="orderIndex"
                name="orderIndex"
                type="number"
                defaultValue={editingAiModel?.orderIndex || 0}
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditingAiModel(null)}>
                İptal
              </Button>
              <Button type="submit" disabled={createAiModelMutation.isPending || updateAiModelMutation.isPending}>
                {(createAiModelMutation.isPending || updateAiModelMutation.isPending) && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {editingAiModel?.id ? 'Güncelle' : 'Ekle'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}