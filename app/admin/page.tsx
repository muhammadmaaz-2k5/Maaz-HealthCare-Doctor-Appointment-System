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
      <header className={Theme.header.adminHeader}>
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
        <p className={Theme.header.adminTitle}>Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className={Theme.header.sectionHeaderCompact}>
          <h1 className={Theme.header.pageHeader}>Welcome 👋</h1>
          <p className={Theme.header.pageSubtitle}>
            Start the day with managing new appointments
          </p>
        </section>

        <section className={Theme.card.statContainer}>
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

        <DataTable
          columns={Columns({
            openModal,
            isModalOpen,
            selectedPatientId,
            closeModal,
          })}
          data={appointments.documents}
        />
      </main>

      {isModalOpen && (
        <PatientModal patientId={selectedPatientId} closeModal={closeModal} />
      )}
    </div>
  );
};

export default AdminPage;
