// Template system for portfolio layouts and content
export interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'section';
  content: string;
  style?: Record<string, any>;
}

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  defaultBlocks: ContentBlock[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
    backgroundColor: string;
  };
}

export const portfolioTemplates: Record<string, TemplateConfig> = {
  default: {
    id: "default",
    name: "Mặc định",
    description: "Template cơ bản phù hợp cho mọi ngành nghề",
    defaultBlocks: [
      {
        id: "header-1",
        type: "text",
        content: "Họ và Tên",
        style: { 
          fontSize: "32px", 
          fontWeight: "bold", 
          textAlign: "center", 
          marginBottom: "8px",
          color: "#1F2937"
        }
      },
      {
        id: "subtitle-1",
        type: "text",
        content: "Chức danh nghề nghiệp",
        style: { 
          fontSize: "18px", 
          textAlign: "center", 
          marginBottom: "32px",
          color: "#6B7280"
        }
      },
      {
        id: "section-1",
        type: "section",
        content: "Giới thiệu",
        style: { 
          fontSize: "20px", 
          fontWeight: "600", 
          marginBottom: "12px",
          color: "#374151",
          borderBottom: "2px solid #E5E7EB",
          paddingBottom: "4px"
        }
      },
      {
        id: "content-1",
        type: "text",
        content: "Viết một đoạn giới thiệu ngắn gọn về bản thân, kinh nghiệm và mục tiêu nghề nghiệp của bạn.",
        style: { 
          fontSize: "14px", 
          lineHeight: "1.6", 
          marginBottom: "24px",
          color: "#4B5563"
        }
      },
      {
        id: "section-2",
        type: "section",
        content: "Kỹ năng",
        style: { 
          fontSize: "20px", 
          fontWeight: "600", 
          marginBottom: "12px",
          color: "#374151",
          borderBottom: "2px solid #E5E7EB",
          paddingBottom: "4px"
        }
      },
      {
        id: "content-2",
        type: "text",
        content: "• Kỹ năng 1\n• Kỹ năng 2\n• Kỹ năng 3",
        style: { 
          fontSize: "14px", 
          lineHeight: "1.6", 
          marginBottom: "24px",
          color: "#4B5563"
        }
      }
    ],
    theme: {
      primaryColor: "#1F2937",
      secondaryColor: "#6B7280",
      accentColor: "#3B82F6",
      fontFamily: "Inter",
      backgroundColor: "#FFFFFF"
    }
  },

  creative: {
    id: "creative",
    name: "Sáng Tạo",
    description: "Template năng động cho các ngành nghề sáng tạo",
    defaultBlocks: [
      {
        id: "header-1",
        type: "text",
        content: "HỌ VÀ TÊN",
        style: { 
          fontSize: "36px", 
          fontWeight: "900", 
          textAlign: "center", 
          marginBottom: "8px",
          color: "#8B5CF6",
          letterSpacing: "2px",
          textTransform: "uppercase"
        }
      },
      {
        id: "subtitle-1",
        type: "text",
        content: "Nhà Thiết Kế Sáng Tạo",
        style: { 
          fontSize: "20px", 
          textAlign: "center", 
          marginBottom: "40px",
          color: "#6366F1",
          fontStyle: "italic"
        }
      },
      {
        id: "quote-1",
        type: "text",
        content: '"Sáng tạo là trí thông minh vui vẻ"',
        style: { 
          fontSize: "18px", 
          textAlign: "center", 
          marginBottom: "32px",
          color: "#8B5CF6",
          fontStyle: "italic",
          padding: "16px",
          backgroundColor: "#F3F4F6",
          borderLeft: "4px solid #8B5CF6"
        }
      },
      {
        id: "section-1",
        type: "section",
        content: "VỀ TÔI",
        style: { 
          fontSize: "24px", 
          fontWeight: "800", 
          marginBottom: "16px",
          color: "#8B5CF6",
          letterSpacing: "1px",
          textTransform: "uppercase"
        }
      },
      {
        id: "content-1",
        type: "text",
        content: "Tôi là một nhà thiết kế đam mê tạo ra những trải nghiệm thị giác độc đáo và có ý nghĩa. Với kinh nghiệm trong thiết kế đồ họa, UI/UX và branding, tôi luôn tìm kiếm cách thức mới để kể câu chuyện thông qua thiết kế.",
        style: { 
          fontSize: "14px", 
          lineHeight: "1.7", 
          marginBottom: "32px",
          color: "#374151"
        }
      },
      {
        id: "section-2",
        type: "section",
        content: "CHUYÊN MÔN",
        style: { 
          fontSize: "24px", 
          fontWeight: "800", 
          marginBottom: "16px",
          color: "#8B5CF6",
          letterSpacing: "1px",
          textTransform: "uppercase"
        }
      },
      {
        id: "content-2",
        type: "text",
        content: "🎨 Thiết kế đồ họa\n✨ UI/UX Design\n🚀 Branding & Identity\n💡 Creative Direction",
        style: { 
          fontSize: "16px", 
          lineHeight: "2", 
          marginBottom: "24px",
          color: "#4B5563"
        }
      }
    ],
    theme: {
      primaryColor: "#8B5CF6",
      secondaryColor: "#6366F1",
      accentColor: "#EC4899",
      fontFamily: "Poppins",
      backgroundColor: "#FAFAFA"
    }
  },

  professional: {
    id: "professional",
    name: "Chuyên Nghiệp",
    description: "Template trang trọng cho các vị trí quản lý và doanh nghiệp",
    defaultBlocks: [
      {
        id: "header-1",
        type: "text",
        content: "Họ và Tên",
        style: { 
          fontSize: "28px", 
          fontWeight: "600", 
          textAlign: "left", 
          marginBottom: "4px",
          color: "#1E293B"
        }
      },
      {
        id: "subtitle-1",
        type: "text",
        content: "Giám đốc điều hành | Chuyên gia tư vấn",
        style: { 
          fontSize: "16px", 
          textAlign: "left", 
          marginBottom: "8px",
          color: "#64748B"
        }
      },
      {
        id: "contact-1",
        type: "text",
        content: "📧 email@example.com | 📱 +84 xxx xxx xxx | 🌐 linkedin.com/in/username",
        style: { 
          fontSize: "12px", 
          textAlign: "left", 
          marginBottom: "32px",
          color: "#64748B"
        }
      },
      {
        id: "section-1",
        type: "section",
        content: "TÓM TẮT NGHỀ NGHIỆP",
        style: { 
          fontSize: "16px", 
          fontWeight: "700", 
          marginBottom: "12px",
          color: "#1E293B",
          backgroundColor: "#F1F5F9",
          padding: "8px 0",
          textTransform: "uppercase",
          letterSpacing: "0.5px"
        }
      },
      {
        id: "content-1",
        type: "text",
        content: "Chuyên gia có hơn 10 năm kinh nghiệm trong lãnh đạo và phát triển doanh nghiệp. Đã dẫn dắt các đội nhóm đa quốc gia và thực hiện thành công nhiều dự án chiến lược, mang lại tăng trưởng bền vững cho tổ chức.",
        style: { 
          fontSize: "14px", 
          lineHeight: "1.6", 
          marginBottom: "24px",
          color: "#334155",
          textAlign: "justify"
        }
      },
      {
        id: "section-2",
        type: "section",
        content: "KINH NGHIỆM LÀM VIỆC",
        style: { 
          fontSize: "16px", 
          fontWeight: "700", 
          marginBottom: "12px",
          color: "#1E293B",
          backgroundColor: "#F1F5F9",
          padding: "8px 0",
          textTransform: "uppercase",
          letterSpacing: "0.5px"
        }
      },
      {
        id: "content-2",
        type: "text",
        content: "2020 - Hiện tại: Giám đốc điều hành - Công ty ABC\n• Quản lý đội ngũ 50+ nhân viên\n• Tăng doanh thu 40% trong 2 năm\n• Triển khai chiến lược số hóa toàn diện",
        style: { 
          fontSize: "14px", 
          lineHeight: "1.6", 
          marginBottom: "20px",
          color: "#334155"
        }
      },
      {
        id: "section-3",
        type: "section",
        content: "BẰNG CẤP & CHỨNG CHỈ",
        style: { 
          fontSize: "16px", 
          fontWeight: "700", 
          marginBottom: "12px",
          color: "#1E293B",
          backgroundColor: "#F1F5F9",
          padding: "8px 0",
          textTransform: "uppercase",
          letterSpacing: "0.5px"
        }
      },
      {
        id: "content-3",
        type: "text",
        content: "• MBA - Trường Đại học Kinh tế TP.HCM\n• PMP - Project Management Professional\n• Chứng chỉ Quản trị Doanh nghiệp",
        style: { 
          fontSize: "14px", 
          lineHeight: "1.6", 
          marginBottom: "24px",
          color: "#334155"
        }
      }
    ],
    theme: {
      primaryColor: "#1E293B",
      secondaryColor: "#64748B",
      accentColor: "#0F172A",
      fontFamily: "Georgia",
      backgroundColor: "#FFFFFF"
    }
  },

  photography: {
    id: "photography",
    name: "Nhiếp Ảnh",
    description: "Template tập trung vào hình ảnh cho nhiếp ảnh gia",
    defaultBlocks: [
      {
        id: "header-1",
        type: "text",
        content: "Họ và Tên",
        style: { 
          fontSize: "30px", 
          fontWeight: "300", 
          textAlign: "center", 
          marginBottom: "8px",
          color: "#374151",
          letterSpacing: "3px"
        }
      },
      {
        id: "subtitle-1",
        type: "text",
        content: "Nhiếp Ảnh Gia",
        style: { 
          fontSize: "14px", 
          textAlign: "center", 
          marginBottom: "40px",
          color: "#6B7280",
          letterSpacing: "2px",
          textTransform: "uppercase"
        }
      },
      {
        id: "image-1",
        type: "image",
        content: "Hero Image",
        style: { 
          width: "100%", 
          height: "200px", 
          marginBottom: "32px",
          objectFit: "cover",
          borderRadius: "4px"
        }
      },
      {
        id: "section-1",
        type: "section",
        content: "Câu chuyện của tôi",
        style: { 
          fontSize: "18px", 
          fontWeight: "400", 
          marginBottom: "16px",
          color: "#374151",
          fontStyle: "italic",
          textAlign: "center"
        }
      },
      {
        id: "content-1",
        type: "text",
        content: "Nhiếp ảnh với tôi không chỉ là việc bấm máy, mà là cách kể câu chuyện qua từng khung hình. Tôi chuyên chụp ảnh chân dung, sự kiện và phong cảnh, luôn tìm kiếm những khoảnh khắc chân thực và cảm xúc nhất.",
        style: { 
          fontSize: "14px", 
          lineHeight: "1.8", 
          marginBottom: "32px",
          color: "#4B5563",
          textAlign: "center",
          fontStyle: "italic"
        }
      },
      {
        id: "section-2",
        type: "section",
        content: "Dịch vụ",
        style: { 
          fontSize: "18px", 
          fontWeight: "400", 
          marginBottom: "16px",
          color: "#374151",
          fontStyle: "italic",
          textAlign: "center"
        }
      },
      {
        id: "content-2",
        type: "text",
        content: "📸 Chụp ảnh cưới\n👨‍👩‍👧‍👦 Chụp ảnh gia đình\n🎭 Chụp ảnh sự kiện\n🌅 Chụp ảnh phong cảnh\n📷 Workshop nhiếp ảnh",
        style: { 
          fontSize: "14px", 
          lineHeight: "2", 
          marginBottom: "32px",
          color: "#4B5563",
          textAlign: "center"
        }
      },
      {
        id: "image-2",
        type: "image",
        content: "Portfolio Gallery",
        style: { 
          width: "100%", 
          height: "150px", 
          marginBottom: "24px",
          objectFit: "cover",
          borderRadius: "4px"
        }
      },
      {
        id: "contact-1",
        type: "text",
        content: "Liên hệ: email@example.com | +84 xxx xxx xxx",
        style: { 
          fontSize: "12px", 
          textAlign: "center", 
          color: "#6B7280",
          marginTop: "32px"
        }
      }
    ],
    theme: {
      primaryColor: "#374151",
      secondaryColor: "#6B7280",
      accentColor: "#D1D5DB",
      fontFamily: "Playfair Display",
      backgroundColor: "#F9FAFB"
    }
  }
};

export function getTemplateById(templateId: string): TemplateConfig {
  return portfolioTemplates[templateId] || portfolioTemplates.default;
}

export function getAllTemplates(): TemplateConfig[] {
  return Object.values(portfolioTemplates);
}