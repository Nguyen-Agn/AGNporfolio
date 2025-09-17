"use client" // directive => render client, không phải server-side

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

// class helper --> nối classname giữa -> tránh xung đột: p-2 + p-4 => p-4
import { cn } from "@/lib/utils"

// rút gọn tên
const TooltipProvider = TooltipPrimitive.Provider // lớp bọc -> thống nhất
const Tooltip = TooltipPrimitive.Root // lớp bọc -> kết nối
const TooltipTrigger = TooltipPrimitive.Trigger // thành phần được tương tác



const TooltipContent = React.forwardRef< // React.forwardRef -> cho phép nhận ref từ cha
  React.ElementRef<typeof TooltipPrimitive.Content>, // kiểu ref (reference)
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> // kiểu props (properties)
>(({ className, sideOffset = 4, ...props }, ref) => ( 
  <TooltipPrimitive.Content // tooltip chính
    ref={ref} // ref từ cha
    sideOffset={sideOffset} // mặc định trigger (trigger: "kích hoạt")
    className={cn( // gộp class
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
      className
    )}
    {...props} // giữ lại props
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName // dặt lại tên

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } // xuất
