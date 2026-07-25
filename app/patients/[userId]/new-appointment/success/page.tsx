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

  if (!appointment) {
    return (
      <div className={Theme.layout.centeredError}>
        <div className={Theme.card.errorBox}>
          <p className="mb-2 font-semibold text-red-600">Appointment Details Not Found</p>
          <p className="mb-4 text-slate-600">
            We could not retrieve the details for this appointment request. It may have already been scheduled, or the link has expired.
          </p>
          <Link href="/" className={Theme.button.primary}>
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primaryPhysician
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
            We&apos;ll be in touch shortly to confirm with Dr. {doctor?.name || appointment.primaryPhysician}.
          </p>
        </section>

        <section className="request-details text-slate-800 border border-green-100 shadow-md">
          <p className="font-semibold">Requested appointment details: </p>
          <div className="flex items-center gap-3">
            {doctor?.image && (
              <img
                src={doctor.image}
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
            )}
            <div>
              <p className={Theme.text.doctorName}>Dr. {doctor?.name || appointment.primaryPhysician}</p>
              {doctor?.specialty && (
                <p className="text-12-regular text-slate-500">{doctor.specialty}</p>
              )}
            </div>
          </div>
          <div className="flex gap-2 items-center">
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
            <p className="font-medium"> {appointment.schedule ? formatDateTime(appointment.schedule).dateTime : "Date pending"}</p>
          </div>
        </section>

        <NewAppointmentButton userId={userId} />

        <p className={Theme.footer.copyrightSuccess}>© 2024 MaazPulse</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
