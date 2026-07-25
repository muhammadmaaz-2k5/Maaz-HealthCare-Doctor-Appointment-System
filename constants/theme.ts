/**
 * MaazPulse — Centralized Reusable Design System & UI Styling Theme
 * 
 * This theme architecture provides standardized, reusable class combinations,
 * structural layouts, visual accents, typography, and interactive button tokens
 * for uniform reuse across all Next.js pages and Shadcn UI components.
 */

export const Theme = {
  // Page & Structural Layout Containers (Engineered for expansive full-website viewports)
  layout: {
    screen: "flex h-screen max-h-screen w-full overflow-hidden bg-dark-300",
    paddedScreen: "flex h-screen max-h-screen w-full px-[5%] overflow-y-auto bg-dark-300",
    container: "remove-scrollbar relative flex w-full flex-1 overflow-y-auto px-[3%] sm:px-[5%]",
    subContainer: "sub-container max-w-[640px] w-full mx-auto",
    subContainerLarge: "sub-container max-w-7xl w-full mx-auto flex-1 justify-between px-2 sm:px-6 xl:px-12",
    subContainerRegister: "sub-container max-w-7xl w-full mx-auto flex-1 flex-col py-10 px-2 sm:px-6 xl:px-12",
    adminContainer: "mx-auto flex w-full max-w-[1600px] flex-col space-y-14 px-4 sm:px-8 xl:px-12",
    centeredError: "flex h-screen w-full items-center justify-center bg-dark-300",
    flexBetween: "flex w-full items-center justify-between",
    flexCenter: "flex w-full flex-col items-center",
  },

  // Headers, Branding & Navigation
  header: {
    logo: "mb-12 h-10 w-fit",
    adminHeader: "admin-header w-full mx-0",
    adminTitle: "text-16-semibold text-dark-700",
    pageHeader: "header text-dark-700",
    pageSubtitle: "text-dark-700",
    sectionHeader: "mb-12 space-y-4 w-full",
    sectionHeaderCompact: "w-full space-y-4",
  },

  // Interactive Form & Input Wrappers
  form: {
    wrapper: "flex-1 space-y-8 w-full",
    input: "text-white w-full",
    iconWrapper: "mx-2 my-auto flex items-center justify-center",
    returningPromptWrapper: "mt-8 flex w-full flex-col items-center gap-2",
  },

  // Standardized Button Patterns
  button: {
    primary: "shad-primary-btn w-full font-semibold transition-all duration-200 hover:opacity-90",
    primaryDisabled: "cursor-not-allowed opacity-50",
    ghost: "shad-gray-btn",
    danger: "shad-danger-btn",
  },

  // Footers & Copyright Alignment
  footer: {
    wrapper: "text-14-regular mt-20 flex w-full justify-between items-center",
    copyright: "justify-items-end text-dark-600 xl:text-left",
    copyrightSimple: "copyright py-12 w-full text-left text-dark-600",
    copyrightAppointment: "copyright mt-10 py-12 w-full text-left text-dark-600",
    copyrightSuccess: "copyright w-full text-center text-dark-600",
    adminLink: "text-green-500 font-medium hover:underline transition-all duration-200",
  },

  // Media, Avatars & Visual Dividers (Responsive edge-to-edge side panels)
  image: {
    sideHalf: "side-img hidden lg:block w-full max-w-[45%] xl:max-w-[50%] object-cover border-l border-dark-500 shadow-2xl",
    sideStandard: "side-img hidden lg:block w-full max-w-[38%] xl:max-w-[42%] 2xl:max-w-[45%] object-cover rounded-l-3xl border-l border-dark-500 shadow-2xl",
    sideBottom: "side-img hidden lg:block w-full max-w-[40%] xl:max-w-[45%] object-cover bg-bottom rounded-l-3xl border-l border-dark-500 shadow-2xl",
    successLogo: "h-10 w-fit",
    avatarSmall: "size-6 rounded-full border border-dark-500",
    avatarMedium: "size-8 rounded-full border border-dark-500 shadow-sm",
  },

  // Cards, Dialogs & Administrative Panels
  card: {
    statContainer: "admin-stat text-dark-700 w-full",
    dialogContent: "max-w-[450px] bg-dark-200 border border-dark-400 shadow-2xl",
    errorBox: "mx-auto max-w-md rounded-md border border-red-300 bg-red-50 px-6 py-8 text-center text-lg text-red-700",
  },

  // Typography & Table Aesthetics
  text: {
    error: "text-xs text-red-500",
    successAccent: "text-green-500 font-semibold",
    muted: "text-sm text-dark-600",
    tableHeader: "text-14-medium",
    tableCell: "text-14-regular min-w-[100px]",
    tablePatientLink: "inline-block rounded-md p-3 text-white transition-colors duration-200 hover:bg-dark-400 hover:text-green-500",
    doctorName: "whitespace-nowrap font-medium text-white",
  }
} as const;

export type ThemeType = typeof Theme;
