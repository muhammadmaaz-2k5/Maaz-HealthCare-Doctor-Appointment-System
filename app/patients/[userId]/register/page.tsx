/* eslint-disable @next/next/no-img-element */
// Replaced next/image with native img for Vercel quota
// import { redirect } from "next/navigation";
import Link from "next/link";

import RegisterForm from "@/components/forms/RegisterForm";
import { Theme } from "@/constants";
import { getPatient, getUser } from "@/lib/actions/patient.actions";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  const patient = await getPatient(userId);

  // Prefer patient.phone over user.phone if available
  let mergedUser = user;
  if (patient && patient.phone && patient.phone !== "") {
    mergedUser = user ? { ...user, phone: patient.phone } : undefined;
  }

  if (!user) {
    return (
      <div className={Theme.layout.centeredError}>
        <div className={Theme.card.errorBox}>
          <p className="mb-2 font-semibold">User not found</p>
          <p className="mb-4">
            The account associated with this patient record no longer exists.
            Please contact support or try registering as a new patient.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={Theme.layout.screen}>
      <section className="remove-scrollbar container">
        <div className={Theme.layout.subContainerRegister}>
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

          {/* Pass mergedUser for prefill/edit */}
          <RegisterForm user={mergedUser} patient={patient} />

          <p className={Theme.footer.copyrightSimple}>© 2024 MaazPulse</p>
        </div>
      </section>

      <img
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className={Theme.image.sideStandard}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

export default Register;
