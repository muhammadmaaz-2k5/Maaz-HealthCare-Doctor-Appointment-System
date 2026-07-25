/* eslint-disable @next/next/no-img-element */
// import Image from "next/image";

import Link from "next/link";

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { Theme } from "@/constants";
import { getPatient } from "@/lib/actions/patient.actions";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  return (
    <div className={Theme.layout.screen}>
      <section className={Theme.layout.container}>
        <div className={Theme.layout.subContainerLarge}>
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

          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
          />

          <p className={Theme.footer.copyrightAppointment}>© 2024 MaazPulse</p>
        </div>
      </section>

      <img
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className={Theme.image.sideBottom}
      />
    </div>
  );
};

export default Appointment;
