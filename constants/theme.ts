/**
 * MaazPulse — Centralized Reusable Design System & UI Styling Theme (White & Green Medical Theme)
 * 
 * This theme architecture provides standardized, reusable class combinations,
 * structural layouts, visual accents, typography, and interactive button tokens
 * for uniform reuse across all Next.js pages and Shadcn UI components.
 */

export const Theme = {
  // Page & Structural Layout Containers (Engineered for expansive white & green medical portal views)
  layout: {
    screen: "flex h-screen max-h-screen w-full overflow-hidden bg-white text-slate-800",
    paddedScreen: "flex h-screen max-h-screen w-full px-[5%] overflow-y-auto bg-white text-slate-800",
    container: "remove-scrollbar relative flex w-full flex-1 overflow-y-auto px-[3%] sm:px-[5%]",
    subContainer: "sub-container max-w-[640px] w-full mx-auto",
    subContainerLarge: "sub-container max-w-7xl w-full mx-auto flex-1 justify-between px-2 sm:px-6 xl:px-12",
    subContainerRegister: "sub-container max-w-7xl w-full mx-auto flex-1 flex-col py-10 px-2 sm:px-6 xl:px-12",
    adminContainer: "mx-auto flex w-full max-w-[1600px] flex-col space-y-14 px-4 sm:px-8 xl:px-12",
    centeredError: "flex h-screen w-full items-center justify-center bg-white text-slate-800",
    flexBetween: "flex w-full items-center justify-between",
    flexCenter: "flex w-full flex-col items-center",
  },

  // Headers, Branding & Navigation
  header: {
    logo: "mb-12 h-10 w-fit drop-shadow-sm",
    adminHeader: "admin-header w-full mx-0 bg-white border-b border-green-100 shadow-md",
    adminTitle: "text-18-bold text-green-900",
    pageHeader: "header text-green-900 font-extrabold tracking-tight",
    pageSubtitle: "text-slate-600 mt-2 font-normal",
    sectionHeader: "mb-12 space-y-3 w-full",
    sectionHeaderCompact: "w-full space-y-2",
  },

  // Interactive Form & Input Wrappers
  form: {
    wrapper: "flex-1 space-y-8 w-full",
    input: "text-slate-900 w-full bg-white",
    iconWrapper: "mx-2 my-auto flex items-center justify-center text-green-600",
    returningPromptWrapper: "mt-8 flex w-full flex-col items-center gap-3",
  },

  // Standardized Button Patterns
  button: {
    primary: "shad-primary-btn w-full font-semibold transition-all duration-200 hover:shadow-lg shadow-green-600/20",
    primaryDisabled: "cursor-not-allowed opacity-50 shadow-none",
    ghost: "shad-gray-btn",
    danger: "shad-danger-btn",
  },

  // Footers & Copyright Alignment
  footer: {
    wrapper: "text-14-regular mt-20 flex w-full justify-between items-center border-t border-green-100 pt-6",
    copyright: "justify-items-end text-slate-500 xl:text-left",
    copyrightSimple: "copyright py-12 w-full text-left text-slate-500 border-t border-green-100 mt-12",
    copyrightAppointment: "copyright mt-10 py-12 w-full text-left text-slate-500 border-t border-green-100",
    copyrightSuccess: "copyright w-full text-center text-slate-500 mt-8",
    adminLink: "text-green-700 font-bold hover:text-green-800 hover:underline transition-all duration-200",
  },

  // Media, Avatars & Visual Dividers
  image: {
    sideHalf: "side-img hidden lg:block w-full max-w-[45%] xl:max-w-[50%] object-cover border-l border-green-100 shadow-xl",
    sideStandard: "side-img hidden lg:block w-full max-w-[38%] xl:max-w-[42%] 2xl:max-w-[45%] object-cover rounded-l-3xl border-l border-green-200 shadow-2xl",
    sideBottom: "side-img hidden lg:block w-full max-w-[40%] xl:max-w-[45%] object-cover bg-bottom rounded-l-3xl border-l border-green-200 shadow-2xl",
    successLogo: "h-10 w-fit drop-shadow-sm",
    avatarSmall: "size-6 rounded-full border border-green-200 shadow-sm",
    avatarMedium: "size-9 rounded-full border-2 border-green-500 shadow-md",
  },

  // Cards, Dialogs & Administrative Panels
  card: {
    statContainer: "admin-stat text-slate-800 w-full",
    dialogContent: "max-w-[480px] bg-white border border-green-200 text-slate-800 shadow-2xl rounded-2xl p-7",
    errorBox: "mx-auto max-w-md rounded-xl border border-red-300 bg-red-50 px-6 py-8 text-center text-base font-medium text-red-700 shadow-md",
  },

  // Typography & Table Aesthetics
  text: {
    error: "text-xs text-red-500 font-semibold",
    successAccent: "text-green-600 font-bold",
    muted: "text-sm text-slate-500",
    tableHeader: "text-14-medium font-bold text-green-900 uppercase tracking-wide",
    tableCell: "text-14-regular min-w-[100px] text-slate-800",
    tablePatientLink: "inline-block rounded-lg px-3 py-1.5 font-semibold text-green-800 transition-all duration-200 hover:bg-green-100 hover:text-green-950",
    doctorName: "whitespace-nowrap font-bold text-slate-900",
  }
} as const;

export type ThemeType = typeof Theme;
