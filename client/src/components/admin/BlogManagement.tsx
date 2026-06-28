import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { apiRequest } from "@/lib/queryClient";
import type { BlogPost } from "../../../../shared/schema";

export function BlogManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/blog-posts"],
  });

  const createMutation = useMutation({
    mutationFn: (data: any) =>
      apiRequest("POST", "/api/admin/blog-posts", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog-posts"] });
      toast({ title: "Blog yazısı oluşturuldu!" });
      setIsDialogOpen(false);
      setEditingPost(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      apiRequest("PUT", `/api/admin/blog-posts/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog-posts"] });
      toast({ title: "Blog yazısı güncellendi!" });
      setIsDialogOpen(false);
      setEditingPost(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest("DELETE", `/api/admin/blog-posts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog-posts"] });
      toast({ title: "Blog yazısı silindi!" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      titleTr: formData.get("titleTr"),
      titleEn: formData.get("titleEn"),
      contentTr: formData.get("contentTr"),
      contentEn: formData.get("contentEn"),
      excerptTr: formData.get("excerptTr"),
      excerptEn: formData.get("excerptEn"),
      slug: formData.get("slug"),
      coverImage: formData.get("coverImage"),
      category: formData.get("category"),
      tags: formData.get("tags") ? JSON.parse(formData.get("tags") as string) : [],
      published: formData.get("published") === "on",
      publishedAt: formData.get("published") === "on" ? new Date().toISOString() : null,
      orderIndex: parseInt(formData.get("orderIndex") as string) || 0,
    };

    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Bu blog yazısını silmek istediğinize emin misiniz?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Blog Yönetimi</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPost(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Blog Yazısı
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? "Blog Yazısını Düzenle" : "Yeni Blog Yazısı"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="titleTr">Başlık (TR)</Label>
                  <Input
                    id="titleTr"
                    name="titleTr"
                    defaultValue={editingPost?.titleTr}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="titleEn">Başlık (EN)</Label>
                  <Input
                    id="titleEn"
                    name="titleEn"
                    defaultValue={editingPost?.titleEn}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  defaultValue={editingPost?.slug}
                  required
                  placeholder="ornek-blog-yazisi"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="excerptTr">Özet (TR)</Label>
                  <Textarea
                    id="excerptTr"
                    name="excerptTr"
                    defaultValue={editingPost?.excerptTr || ""}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="excerptEn">Özet (EN)</Label>
                  <Textarea
                    id="excerptEn"
                    name="excerptEn"
                    defaultValue={editingPost?.excerptEn || ""}
                    rows={3}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contentTr">İçerik (TR)</Label>
                  <Textarea
                    id="contentTr"
                    name="contentTr"
                    defaultValue={editingPost?.contentTr}
                    required
                    rows={10}
                  />
                </div>
                <div>
                  <Label htmlFor="contentEn">İçerik (EN)</Label>
                  <Textarea
                    id="contentEn"
                    name="contentEn"
                    defaultValue={editingPost?.contentEn}
                    required
                    rows={10}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="coverImage">Kapak Resmi URL</Label>
                <Input
                  id="coverImage"
                  name="coverImage"
                  type="url"
                  defaultValue={editingPost?.coverImage || ""}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="category">Kategori</Label>
                  <Input
                    id="category"
                    name="category"
                    defaultValue={editingPost?.category || ""}
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Etiketler (JSON)</Label>
                  <Input
                    id="tags"
                    name="tags"
                    defaultValue={JSON.stringify(editingPost?.tags || [])}
                    placeholder='["tag1", "tag2"]'
                  />
                </div>
                <div>
                  <Label htmlFor="orderIndex">Sıra</Label>
                  <Input
                    id="orderIndex"
                    name="orderIndex"
                    type="number"
                    defaultValue={editingPost?.orderIndex || 0}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  name="published"
                  defaultChecked={editingPost?.published ?? false}
                />
                <Label htmlFor="published">Yayınla</Label>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  İptal
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Kaydet
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Başlık (TR)</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Sıra</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts?.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.titleTr}</TableCell>
                  <TableCell>{post.slug}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    {post.published ? (
                      <span className="text-green-600">Yayında</span>
                    ) : (
                      <span className="text-gray-500">Taslak</span>
                    )}
                  </TableCell>
                  <TableCell>{post.orderIndex}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(post)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(post.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
