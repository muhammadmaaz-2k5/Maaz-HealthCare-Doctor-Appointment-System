/* eslint-disable @next/next/no-img-element */
"use client";
// Replaced next/image with native img for Vercel quota
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { PatientForm } from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Theme } from "@/constants";
const AdminLink = dynamic(() => import("@/components/AdminLink"), {
  ssr: false,
});

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";

  // Returning patient dialog state
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // for API/form only
  const [error, setError] = useState("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleReturningPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `/api/checkEmail?email=${encodeURIComponent(email)}`
      );
      const data = await res.json();
      if (data.exists && data.userId) {
        startTransition(() => {
          router.push(`/patients/${data.userId}/register`);
        });
      } else if (data.exists && data.user) {
        // fallback if userId is not returned but user object is
        startTransition(() => {
          router.push(`/patients/${data.user.$id}/register`);
        });
      } else if (data.exists) {
        // fallback: let user type email, go to register, prefill
        startTransition(() => {
          router.push(
            `/patients/find-by-email?email=${encodeURIComponent(email)}`
          );
        });
      } else {
        setError("No patient found with that email.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className={Theme.layout.screen}>
      {isAdmin && <PasskeyModal />}

      <section className={Theme.layout.container}>
        <div className={Theme.layout.subContainer}>
          <div className="flex flex-1 flex-col items-center justify-center">
            <Link href="/" className="mb-10">
              <img
                src="/assets/icons/logo-full.svg"
                width={200}
                height={40}
                alt="MaazPulse Logo"
                className={Theme.header.logo}
                loading="eager"
                decoding="async"
                style={{ height: "auto", width: "auto" }}
              />
            </Link>

            <div className="w-full max-w-[480px] rounded-2xl border border-green-100 bg-white p-8 shadow-lg shadow-green-950/5 sm:p-10">
              <PatientForm />
            </div>

            <div className={Theme.form.returningPromptWrapper}>
              <span className={Theme.text.muted}>
                Already registered? or already made an appointment before? Then
                click this below button, Thank you.
              </span>
              <Button
                variant="outline"
                className={`${Theme.button.ghost}`}
                onClick={() => {
                  startTransition(() => setOpen(true));
                }}
                type="button"
                disabled={isPending}
              >
                {isPending ? "Continuing..." : "Returning Patient?"}
              </Button>
            </div>

            <div className="mt-8 w-full max-w-[480px]">
              <div className="rounded-xl border-2 border-dashed border-green-300 bg-green-50/60 p-5 text-center">
                <p className="text-14-semibold text-green-800">Admin Login</p>
                <p className="mt-2 text-12-regular text-slate-600">
                  Passkey:{" "}
                  <span className="font-mono text-16-semibold text-green-900">
                    {process.env.NEXT_PUBLIC_ADMIN_PASSKEY || "123123"}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    startTransition(() => router.push("/?admin=true"));
                  }}
                  className="mt-4 w-full rounded-lg border border-green-200 bg-white px-4 py-2.5 text-14-semibold text-green-800 shadow-sm transition-all hover:bg-green-100 hover:text-green-900"
                >
                  Open Admin Panel
                </button>
              </div>
            </div>

            <div className="mt-12 flex w-full flex-col items-center gap-3">
              <p className="text-14-regular text-slate-500">
                © 2024 MaazPulse
              </p>
              <AdminLink className="text-14-semibold text-green-700 hover:text-green-800 hover:underline transition-all duration-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Returning Patient Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={Theme.card.dialogContent}>
          <DialogHeader>
            <DialogTitle>Returning Patient</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleReturningPatient} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={Theme.form.input}
            />
            {error && <p className={Theme.text.error}>{error}</p>}
            <DialogFooter>
              <Button
                type="submit"
                className={`${Theme.button.primary}${loading || isPending ? " " + Theme.button.primaryDisabled : ""}`}
                disabled={loading || isPending}
              >
                {loading || isPending ? "Continuing..." : "Continue"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <img
        src="/assets/images/onboarding-img.webp"
        width={800}
        height={600}
        alt="Onboarding"
        className={Theme.image.sideHalf}
        loading="eager"
        decoding="async"
        style={{ height: "auto", width: "auto" }}
      />
    </div>
  );
};

export default Home;
