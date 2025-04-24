
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface PostPreviewProps {
  content: string;
}

const PostPreview = ({ content }: PostPreviewProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <h3 className="text-lg font-semibold">Xem trước bài viết</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">Ảnh minh họa</span>
          </div>
          <p className="text-gray-700">{content}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostPreview;
