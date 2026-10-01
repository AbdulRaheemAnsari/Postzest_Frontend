"use client";

import React, { useState, useRef } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Smile,
  Hash,
  WandSparkles,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxChars?: number;
  channelName?: string;
  className?: string;
}

const EMOJI_LIST = ["🚀", "✨", "🔥", "💡", "📈", "👇", "🎯", "👏", "🎉", "🧠", "💪", "💼", "📌", "🌐", "🙌"];
const SUGGESTED_HASHTAGS = ["#BuildInPublic", "#SaaSGrowth", "#AIWorkflows", "#CreatorEconomy", "#MarketingOps"];

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "What's on your mind? Write your post here...",
  maxChars,
  channelName,
  className,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);

  // Formatting helpers
  const insertFormatting = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    const replacement = `${prefix}${selectedText || "text"}${suffix}`;
    const newValue = value.substring(0, start) + replacement + value.substring(end);

    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const handleBold = () => insertFormatting("**", "**");
  const handleItalic = () => insertFormatting("*", "*");
  const handleQuote = () => insertFormatting("> ");
  const handleBulletList = () => insertFormatting("- ");
  const handleNumberedList = () => insertFormatting("1. ");

  const handleInsertEmoji = (emoji: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(value + emoji);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = value.substring(0, start) + emoji + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 0);
  };

  const handleInsertHashtag = (hashtag: string) => {
    if (!value.includes(hashtag)) {
      const spacing = value.length > 0 && !value.endsWith(" ") ? " " : "";
      onChange(value + spacing + hashtag);
    }
  };

  const handleAddLink = () => {
    if (!linkUrl) return;
    const formattedLink = linkText ? `[${linkText}](${linkUrl})` : linkUrl;
    onChange(value + (value ? " " : "") + formattedLink);
    setLinkUrl("");
    setLinkText("");
    setIsLinkPopoverOpen(false);
  };

  // Metrics calculation
  const charCount = value.length;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const readTimeSeconds = Math.max(1, Math.ceil(wordCount / 3.5)); // ~200 wpm
  const isOverLimit = maxChars ? charCount > maxChars : false;

  return (
    <div className={cn("w-full border border-border/80 rounded-xl bg-background overflow-hidden shadow-xs", className)}>
      {/* Formatting Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-1 p-2 bg-muted/30 border-b border-border/60">
        <div className="flex items-center gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleBold}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground cursor-pointer"
            title="Bold (**text**)"
          >
            <Bold className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleItalic}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground cursor-pointer"
            title="Italic (*text*)"
          >
            <Italic className="w-4 h-4" />
          </Button>

          <div className="w-[1px] h-4 bg-border mx-1" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleBulletList}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground cursor-pointer"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleNumberedList}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground cursor-pointer"
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleQuote}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground cursor-pointer"
            title="Blockquote"
          >
            <Quote className="w-4 h-4" />
          </Button>

          <div className="w-[1px] h-4 bg-border mx-1" />

          {/* Link Popover */}
          <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground cursor-pointer"
                title="Insert Link"
              >
                <LinkIcon className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="w-72 p-3 space-y-3">
              <h4 className="text-xs font-semibold text-foreground">Insert Link</h4>
              <div className="space-y-2">
                <div>
                  <Label className="text-[11px] text-muted-foreground">URL</Label>
                  <Input
                    placeholder="https://example.com"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-[11px] text-muted-foreground">Link Text (optional)</Label>
                  <Input
                    placeholder="Click here"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
                <Button size="sm" onClick={handleAddLink} className="w-full h-8 text-xs font-semibold cursor-pointer">
                  Add Link
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Emoji Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground cursor-pointer"
                title="Insert Emoji"
              >
                <Smile className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="w-64 p-2">
              <div className="grid grid-cols-5 gap-1">
                {EMOJI_LIST.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => handleInsertEmoji(emoji)}
                    className="h-8 w-8 rounded hover:bg-muted text-base flex items-center justify-center transition-colors cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* AI Rewriter Action */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 px-2.5 text-xs font-semibold text-amber-600 border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 cursor-pointer gap-1.5"
        >
          <WandSparkles className="w-3.5 h-3.5" />
          <span>Write with AI</span>
        </Button>
      </div>

      {/* Textarea Input */}
      <div className="p-3">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[140px] border-none focus-visible:ring-0 resize-none p-0 text-sm sm:text-base leading-relaxed text-foreground placeholder:text-muted-foreground/60 shadow-none bg-transparent"
        />
      </div>

      {/* Suggested Hashtags Bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-t border-border/40 bg-muted/10 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-medium text-muted-foreground shrink-0 flex items-center gap-0.5">
          <Hash className="w-3 h-3" />
          Suggest:
        </span>
        {SUGGESTED_HASHTAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleInsertHashtag(tag)}
            className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-secondary/60 hover:bg-primary/10 hover:text-primary transition-colors shrink-0 text-muted-foreground cursor-pointer"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Bottom Metrics Bar */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-border/60 bg-muted/20 text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          {/* Character counter */}
          <span className={cn("font-medium flex items-center gap-1", isOverLimit && "text-destructive font-bold")}>
            {maxChars ? `${charCount} / ${maxChars}` : `${charCount} chars`}
          </span>

          <span className="text-border">•</span>

          <span>{wordCount} words</span>

          <span className="text-border">•</span>

          <span>Est. read: {readTimeSeconds}s</span>
        </div>

        {channelName && (
          <span className="text-[11px] font-medium text-primary">
            Editing for {channelName}
          </span>
        )}
      </div>
    </div>
  );
};
