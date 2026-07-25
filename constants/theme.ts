/**
 * MaazPulse — Centralized Reusable Design System & UI Styling Theme
 * 
 * This theme architecture provides standardized, reusable class combinations,
 * structural layouts, visual accents, typography, and interactive button tokens
 * for uniform reuse across all Next.js pages and Shadcn UI components.
 */

export const Theme = {
  // Page & Structural Layout Containers
  layout: {
    screen: "flex h-screen max-h-screen",
    paddedScreen: "flex h-screen max-h-screen px-[5%]",
    container: "remove-scrollbar container my-auto",
    subContainer: "sub-container max-w-[496px]",
    subContainerLarge: "sub-container max-w-[860px] flex-1 justify-between",
    subContainerRegister: "sub-container max-w-[860px] flex-1 flex-col py-10",
    adminContainer: "mx-auto flex max-w-7xl flex-col space-y-14",
    centeredError: "flex h-screen items-center justify-center",
    flexBetween: "flex items-center justify-between",
    flexCenter: "flex flex-col items-center",
  },

  // Headers, Branding & Navigation
  header: {
    logo: "mb-12 h-10 w-fit",
    adminHeader: "admin-header",
    adminTitle: "text-16-semibold text-dark-700",
    pageHeader: "header text-dark-700",
    pageSubtitle: "text-dark-700",
    sectionHeader: "mb-12 space-y-4",
    sectionHeaderCompact: "w-full space-y-4",
  },

  // Interactive Form & Input Wrappers
  form: {
    wrapper: "flex-1 space-y-6",
    input: "text-white",
    iconWrapper: "mx-2 my-auto flex items-center justify-center",
    returningPromptWrapper: "mt-8 flex flex-col items-center gap-2",
  },

  // Standardized Button Patterns
  button: {
    primary: "shad-primary-btn w-full",
    primaryDisabled: "cursor-not-allowed opacity-50",
    ghost: "shad-gray-btn",
    danger: "shad-danger-btn",
  },

  // Footers & Copyright Alignment
  footer: {
    wrapper: "text-14-regular mt-20 flex justify-between",
    copyright: "justify-items-end text-dark-600 xl:text-left",
    copyrightSimple: "copyright py-12",
    copyrightAppointment: "copyright mt-10 py-12",
    copyrightSuccess: "copyright",
    adminLink: "text-green-500 hover:underline transition-all duration-200",
  },

  // Media, Avatars & Visual Dividers
  image: {
    sideHalf: "side-img max-w-[50%]",
    sideStandard: "side-img max-w-[390px]",
    sideBottom: "side-img max-w-[390px] bg-bottom",
    successLogo: "h-10 w-fit",
    avatarSmall: "size-6",
    avatarMedium: "size-8 rounded-full border border-dark-500",
  },

  // Cards, Dialogs & Administrative Panels
  card: {
    statContainer: "admin-stat text-dark-700",
    dialogContent: "max-w-[400px]",
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
