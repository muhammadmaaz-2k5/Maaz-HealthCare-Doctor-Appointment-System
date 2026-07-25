/* eslint-disable @next/next/no-img-element */

"use client";

// import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import GlobalLoading from "@/components/GlobalLoading";
import { StatCard } from "@/components/StatCard";
import { Columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { Theme } from "@/constants";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";

import { PatientModal } from "../../components/PatientModal";

const AdminPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null
  );
  const [appointments, setAppointments] = useState<any>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      const data = await getRecentAppointmentList();
      setAppointments(data);
    };

    fetchAppointments();
  }, []);

  const openModal = (patientId: string) => {
    setSelectedPatientId(patientId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatientId(null);
  };

  if (!appointments) {
    return <GlobalLoading text="Loading appointments..." />;
  }

  return (
    <div className={Theme.layout.adminContainer}>
      <header className="sticky top-0 z-30 mx-4 flex items-center justify-between rounded-2xl border border-green-100 bg-white px-6 py-4 shadow-lg shadow-green-950/5 sm:mx-8 xl:mx-12">
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
        <div className="flex items-center gap-4">
          <p className="text-18-bold text-green-900">Admin Dashboard</p>
          <span className="hidden rounded-full bg-green-100 px-3 py-1 text-12-semibold text-green-800 sm:inline-block">
            Clinic Admin
          </span>
        </div>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-2">
          <h1 className="text-32-bold text-green-900 tracking-tight">Welcome 👋</h1>
          <p className="text-16-regular text-slate-600">
            Start the day with managing new appointments
          </p>
        </section>

        <section className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:gap-10">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        <section className="w-full space-y-4">
          <h2 className="text-18-bold text-green-800">Recent Appointments</h2>
          <DataTable
            columns={Columns({
              openModal,
              isModalOpen,
              selectedPatientId,
              closeModal,
            })}
            data={appointments.documents}
          />
        </section>
      </main>

      {isModalOpen && (
        <PatientModal patientId={selectedPatientId} closeModal={closeModal} />
      )}
    </div>
  );
};

export default AdminPage;
