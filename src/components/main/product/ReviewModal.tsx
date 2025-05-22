"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToastify } from "@/components/providers/ToastProvider";
import { Input } from "@/components/ui/input";

interface ReviewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ReviewFormValues) => void;
}

const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  comment: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(500, "Review cannot exceed 500 characters"),
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(255, "Name cannot exceed 255 characters"),
  email: z.string().email("Please enter a valid email address"),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const { showToast } = useToastify();

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
      name: "",
      email: "",
    },
  });

  const rating = form.watch("rating");

  const handleSubmit = (data: ReviewFormValues) => {
    onSubmit(data);
    form.reset();
    onOpenChange(false);
    showToast("Thank you! Your review has been submitted.", {
      title: "Success",
      type: "success",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-1 border-b border-primary/10 pb-2">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Share Your Experience
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Your feedback helps others make better choices
          </p>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="block text-center text-lg font-medium text-gray-700">
                    How would you rate this product?
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="grid grid-cols-5 w-full p-1 bg-gray-50/50 rounded-2xl">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className={`
                              w-full aspect-square flex items-center justify-center 
                              transition-all duration-300 transform
                              ${star === 1 ? "rounded-l-xl" : ""}
                              ${star === 5 ? "rounded-r-xl" : ""}
                              ${
                                field.value >= star
                                  ? "bg-primary/10 scale-110"
                                  : "hover:bg-primary/5 hover:scale-105"
                              }
                            `}
                            onClick={() => field.onChange(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                          >
                            <Star
                              size={32}
                              strokeWidth={2}
                              className={`
                                ${
                                  (
                                    hoverRating
                                      ? hoverRating >= star
                                      : field.value >= star
                                  )
                                    ? "fill-primary text-primary"
                                    : "text-gray-300"
                                } transition-all duration-300
                              `}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-center" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Your Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      className="bg-white border-gray-200 focus:border-primary/30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="mt-[-8px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Your Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="bg-white border-gray-200 focus:border-primary/30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="mt-[-8px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Your Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share what you liked, what could be improved, and your overall experience..."
                      className="min-h-[120px] resize-none bg-gray-50/50 border-gray-200 focus:border-primary/30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="mt-[-8px]" />
                </FormItem>
              )}
            />

            <DialogFooter className="sm:justify-between pt-2 border-t border-gray-100">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-200 hover:bg-gray-50"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={!rating}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Submit Review
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
