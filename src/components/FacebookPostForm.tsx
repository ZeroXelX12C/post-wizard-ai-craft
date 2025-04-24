
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarDays, Clock, Image, MessageSquare, Check } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import PostPreview from './PostPreview';

const formSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),
  topic: z.string().min(1, "Vui lòng chọn chủ đề"),
  tone: z.string().min(1, "Vui lòng chọn tông giọng"),
  content: z.string().min(10, "Nội dung phải có ít nhất 10 ký tự"),
  image: z.string().optional(),
  fanpage: z.string().min(1, "Vui lòng chọn Fanpage"),
  postDate: z.date({
    required_error: "Vui lòng chọn ngày đăng bài",
  }),
});

const FacebookPostForm = () => {
  const [step, setStep] = useState(1);
  const [aiContent, setAiContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      topic: "",
      tone: "",
      content: "",
      image: "",
      fanpage: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Giả lập AI xử lý
    setAiContent("AI đã tạo nội dung dựa trên thông tin bạn cung cấp...");
    setShowPreview(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "w-1/2 h-2 rounded",
                i === 1 ? "mr-2" : "ml-2",
                step >= i ? "bg-purple-500" : "bg-gray-200"
              )}
            />
          ))}
        </div>
        <h2 className="text-2xl font-semibold text-center mb-2">
          {step === 1 ? "Tạo bài viết mới" : "Xem trước & Đăng bài"}
        </h2>
      </div>

      {step === 1 ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề bài viết</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tiêu đề bài viết..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chủ đề bài viết</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn chủ đề" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="promotion">Khuyến mãi</SelectItem>
                        <SelectItem value="product">Giới thiệu sản phẩm</SelectItem>
                        <SelectItem value="tips">Mẹo hay</SelectItem>
                        <SelectItem value="news">Tin tức</SelectItem>
                        <SelectItem value="entertainment">Tương tác giải trí</SelectItem>
                        <SelectItem value="other">Tùy chọn khác</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tông giọng bài viết</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn tông giọng" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fun">Vui vẻ</SelectItem>
                        <SelectItem value="professional">Chuyên nghiệp</SelectItem>
                        <SelectItem value="friendly">Gần gũi</SelectItem>
                        <SelectItem value="sales">Bán hàng mạnh</SelectItem>
                        <SelectItem value="formal">Lạnh lùng</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung mong muốn</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Giới thiệu sản phẩm mới với ưu đãi hấp dẫn..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ảnh minh họa</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <Input
                          type="url"
                          placeholder="Nhập URL ảnh..."
                          {...field}
                        />
                        <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-4 hover:border-purple-500 transition-colors cursor-pointer">
                          <div className="text-center">
                            <Image className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-500">
                              Kéo thả hoặc click để tải ảnh lên
                            </p>
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fanpage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chọn Fanpage</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn Fanpage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="page1">Fanpage 1</SelectItem>
                        <SelectItem value="page2">Fanpage 2</SelectItem>
                        <SelectItem value="page3">Fanpage 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="postDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Thời gian đăng bài</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Chọn ngày đăng bài</span>
                          )}
                          <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600"
              onClick={() => setStep(2)}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Tạo nội dung bằng AI
            </Button>
          </form>
        </Form>
      ) : (
        <div className="space-y-6">
          <PostPreview content={aiContent} />
          
          <div className="flex flex-col space-y-4">
            <Button
              onClick={() => {/* Xử lý đăng bài */}}
              className="bg-purple-500 hover:bg-purple-600"
            >
              <Check className="w-4 h-4 mr-2" />
              Tôi ưng ý - Đăng lên Fanpage
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setStep(1)}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Chỉnh sửa / Góp ý cho AI
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacebookPostForm;
