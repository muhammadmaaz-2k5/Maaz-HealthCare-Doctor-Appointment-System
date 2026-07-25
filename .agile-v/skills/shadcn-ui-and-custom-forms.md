# Skill: Shadcn UI & Custom Form Field Engineering

## 📌 Protocol Overview
MaazPulse achieves its signature high-performance, dark-mode healthcare design by leveraging Radix UI component primitives, Shadcn UI styling conventions, and an advanced consolidated form input wrapper: `CustomFormField.tsx`. This manual outlines acceptable styling methodologies and form construction rules.

---

## 🧩 CustomFormField Architecture

To maintain absolute uniformity across patient registration and clinic appointment booking screens, raw `<input>`, `<select>`, or `<textarea>` elements are strictly prohibited in application pages. All input controls must utilize [components/CustomFormField.tsx](../../components/CustomFormField.tsx).

### 1. Supported Form Field Types (`FormFieldType`)
When instantiating a form control, provide the appropriate enum identifier:
* `INPUT`: Standard text fields, email entries, identification numbers.
* `PHONE_INPUT`: Internationalized dial-code selector with regex validation via `react-phone-number-input`.
* `DATE_PICKER`: Interactive calendar popup utilizing `react-datepicker` and Lucide icons.
* `SELECT`: Radix UI accessible dropdown menus for Doctor selection and gender identities.
* `TEXTAREA`: Multi-line medical notes, symptoms description, or allergy documentation.
* `CHECKBOX`: Consent toggles, HIPAA agreements, and terms verification.
* `SKELETON`: Custom render overrides for advanced layouts (e.g., custom radio selection grids for primary physicians).
* `FILE_UPLOAD`: Integrated drag-and-drop zone using `FileUploader.tsx`.

### 2. Form Implementation Pattern
```tsx
import CustomFormField from "@/components/CustomFormField";
import { FormFieldType } from "@/components/CustomFormField";
import { Form } from "@/components/ui/form";

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
    <CustomFormField
      fieldType={FormFieldType.INPUT}
      control={form.control}
      name="name"
      label="Full Name"
      placeholder="Ex. Adrian Hajdin"
      iconSrc="/assets/icons/user.svg"
      iconAlt="user"
    />

    <CustomFormField
      fieldType={FormFieldType.PHONE_INPUT}
      control={form.control}
      name="phone"
      label="Phone Number"
      placeholder="(555) 123-4567"
    />
  </form>
</Form>
```

---

## 🎨 Tailwind & UI Aesthetic Standards

1. **Dark Mode Palette Tokens**: Rely explicitly on custom theme properties declared in `tailwind.config.ts`.
   * Background surfaces: `bg-dark-300`, `bg-dark-400`, `bg-dark-500`.
   * Text & Borders: `text-dark-700`, `border-dark-500`, `text-green-500`, `text-red-700`.
2. **Dynamic Utility Class Merging**: Whenever composing conditionally applied CSS classes, wrap strings inside `cn()` (from `lib/utils.ts`) to ensure Tailwind overrides execute correctly without style collisions:
```tsx
import { cn } from "@/lib/utils";

<div className={cn("flex w-full items-center gap-4 rounded-md bg-dark-400 p-4", {
  "border border-red-500 bg-red-900/20": hasError,
  "border border-green-500": isSuccess
})} />
```
3. **Micro-Animations & Transitions**: Apply smooth hover and interactive transition states (`transition-all duration-200 hover:opacity-80`) on interactive buttons and patient card selections to maintain an interactive and responsive application feel.
