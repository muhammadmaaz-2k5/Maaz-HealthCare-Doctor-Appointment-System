/* eslint-disable @next/next/no-img-element */
// Replaced next/image with native img for Vercel quota
import dynamic from "next/dynamic";
import Link from "next/link";

import { Doctors, Theme } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
const NewAppointmentButton = dynamic(
  () => import("@/components/NewAppointmentButton"),
  { ssr: false }
);

const RequestSuccess = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment.primaryPhysician
  );

  return (
    <div className={Theme.layout.paddedScreen}>
      <div className="success-img">
        <Link href="/">
          <img
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="MaazPulse Logo"
            className={Theme.image.successLogo}
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
            loading="eager"
            decoding="async"
          />
        </Link>

        <section className={Theme.layout.flexCenter}>
          <img
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
            style={{
              width: 280,
              height: 300,
              objectFit: "contain",
              aspectRatio: "auto",
            }}
            loading="eager"
            decoding="async"
          />
          <h2 className={`${Theme.header.pageHeader} mb-6 max-w-[600px] text-center`}>
            Your <span className={Theme.text.successAccent}>appointment request</span> has
            been successfully submitted!
          </h2>
          <p className={Theme.header.pageSubtitle}>
            We&apos;ll be in touch shortly to confirm with Dr. {doctor?.name}.
          </p>
        </section>

        <section className="request-details text-dark-700">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <img
              src={doctor?.image!}
              alt="doctor"
              width={100}
              height={100}
              className={Theme.image.avatarSmall}
              style={{
                width: "auto",
                height: "auto",
                maxWidth: 100,
                maxHeight: 100,
                objectFit: "contain",
                aspectRatio: "auto",
              }}
              loading="lazy"
              decoding="async"
            />
            <div>
              <p className={Theme.text.doctorName}>Dr. {doctor?.name}</p>
              {doctor?.specialty && (
                <p className="text-12-regular text-dark-600">{doctor.specialty}</p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <img
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
              style={{
                width: "auto",
                height: "auto",
                maxWidth: 24,
                maxHeight: 24,
                objectFit: "contain",
                aspectRatio: "auto",
              }}
              loading="lazy"
              decoding="async"
            />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <NewAppointmentButton userId={userId} />

        <p className={Theme.footer.copyrightSuccess}>© 2024 MaazPulse</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
