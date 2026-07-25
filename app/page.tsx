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
          <Link href="/">
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

          <PatientForm />

          <div className={Theme.form.returningPromptWrapper}>
            <span className={Theme.text.muted}>
              Already registered? or already made an appointment before? Then
              click this below button, Thank you.
            </span>
            <Button
              variant="outline"
              className={`${Theme.button.primary}${isPending ? " " + Theme.button.primaryDisabled : ""}`}
              onClick={() => {
                startTransition(() => setOpen(true));
              }}
              type="button"
              disabled={isPending}
            >
              {isPending ? "Continuing..." : "Returning Patient?"}
            </Button>
          </div>

          <div className={Theme.footer.wrapper}>
            <p className={Theme.footer.copyright}>
              © 2024 MaazPulse
            </p>
            <AdminLink className={Theme.footer.adminLink} />
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
