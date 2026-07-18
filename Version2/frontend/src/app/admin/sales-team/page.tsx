"use client";

import { useEffect, useState } from "react";
import {
  WireframeHeader,
  WireframeMetric,
  WireframeSection,
} from "@/components/WireframeShell";

const members = [
  "Nok · Sales",
  "Ton · Account Manager",
  "May · Sales",
  "Phet · Sales Lead",
];
const initialTasks = [
  [
    "TASK-1042",
    "โทรยืนยันความต้องการ · Green Clinic",
    "Nok · Sales",
    "In progress",
    "วันนี้ 10:30",
  ],
  [
    "TASK-1043",
    "ส่งแพ็กเกจ · Lanna Cafe",
    "May · Sales",
    "Assigned",
    "วันนี้ 11:00",
  ],
  [
    "TASK-1044",
    "อัปเดต Proposal · Acme Accounting",
    "Ton · Account Manager",
    "In progress",
    "วันนี้ 13:00",
  ],
  [
    "TASK-1045",
    "ประสาน QA · Bright Home",
    "Nok · Sales",
    "Waiting",
    "วันนี้ 13:30",
  ],
  [
    "TASK-1046",
    "ติดตาม Contract · Green Clinic",
    "Phet · Sales Lead",
    "Assigned",
    "ภายใน 30 วัน",
  ],
];
const handoffItems = [
  ["HANDOFF-02", "May · Sales", "ยังไม่มีผู้รับ", "ช่วยตรวจ Proposal · Acme Accounting", "วันนี้ 16:00"],
  ["HANDOFF-01", "Nok · Sales", "Ton · Account Manager", "ช่วย Follow-up Green Clinic", "วันนี้ 15:00"],
  ["HANDOFF-03", "Phet · Sales Lead", "May · Sales", "ประสาน QA · Bright Home", "พรุ่งนี้ 10:00"],
];

type ActivityKind = "note" | "image" | "date" | "label" | "checklist" | "task";

function ActivityIcon({ kind }: { kind: ActivityKind }) {
  const common = "h-4 w-4";
  if (kind === "note") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}><path d="M4 5h16v14H4z" /><path d="M8 9h8M8 13h5" /></svg>;
  if (kind === "image") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8" cy="9" r="1.5" /><path d="m4 17 5-5 3 3 2-2 6 5" /></svg>;
  if (kind === "date") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /><path d="M8 14h.01M12 14h.01M16 14h.01" /></svg>;
  if (kind === "label") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}><path d="m4 5 8-2 9 9-8 8-9-9z" /><circle cx="9" cy="8" r="1" /></svg>;
  if (kind === "checklist") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}><path d="m4 7 2 2 3-4M4 15l2 2 3-4M12 8h8M12 16h8" /></svg>;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}><path d="M6 4h12v16H6z" /><path d="M9 8h6M9 12h6M9 16h4" /></svg>;
}

export default function SalesTeamPage() {
  const [tasks] = useState(initialTasks);
  const [dialogTask, setDialogTask] = useState<(typeof initialTasks)[number] | null>(null);
  const [filter, setFilter] = useState("All members");
  const [takenTasks, setTakenTasks] = useState<string[]>([]);
  const [currentRole, setCurrentRole] = useState("Sales Manager");
  const [activeTeamTab, setActiveTeamTab] = useState<"task-board" | "handoff">("handoff");
  const [teamPage, setTeamPage] = useState(1);
  const [dialogNote, setDialogNote] = useState("");
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [dialogImage, setDialogImage] = useState<string | null>(null);
  const [dialogDue, setDialogDue] = useState("");
  const [isEditingDialogDue, setIsEditingDialogDue] = useState(false);

  useEffect(() => {
    const role = window.localStorage.getItem("wop-demo-role");
    if (role) setCurrentRole(role);
  }, []);
  useEffect(() => {
    if (!dialogTask) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDialogTask(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dialogTask]);
  const isSales = currentRole.trim().toLowerCase() === "sales";
  const taskBoardFilter = isSales ? "All members" : filter;
  const visibleTasks =
    taskBoardFilter === "All members"
      ? tasks
      : tasks.filter((task) => task[2] === taskBoardFilter);
  const taskPageSize = 4;
  const handoffPageSize = 4;
  const taskPageCount = Math.max(1, Math.ceil(visibleTasks.length / taskPageSize));
  const handoffPageCount = Math.max(1, Math.ceil(handoffItems.length / handoffPageSize));
  const totalTeamPages = activeTeamTab === "task-board" ? taskPageCount : handoffPageCount;
  const paginatedTasks = visibleTasks.slice(
    (teamPage - 1) * taskPageSize,
    teamPage * taskPageSize,
  );
  const paginatedHandoffs = handoffItems.slice(
    (teamPage - 1) * handoffPageSize,
    teamPage * handoffPageSize,
  );

  useEffect(() => {
    setTeamPage(1);
  }, [activeTeamTab, taskBoardFilter]);

  const openTaskDialog = (task: (typeof initialTasks)[number]) => {
    setDialogTask(task);
    setDialogDue(task[4]);
    setDialogNote("");
    setDialogImage(null);
    setShowNoteEditor(false);
    setIsEditingDialogDue(false);
  };
  const openHandoffDialog = (handoff: (typeof handoffItems)[number]) => {
    const [id, , to, task, due] = handoff;
    openTaskDialog([
      id,
      task,
      to,
      to === "ยังไม่มีผู้รับ" ? "Waiting" : "Assigned",
      due,
    ]);
  };

  return (
    <WireframeHeader
      area="CRM & Sales Team"
      title="Sales Team"
      role={currentRole}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <WireframeMetric
          label="Team tasks"
          value="24"
          detail="งานทั้งหมดของทีม"
        />
        <WireframeMetric
          label="In progress"
          value="11"
          detail="กำลังดำเนินการ"
        />
        <WireframeMetric label="Overdue" value="3" detail="ต้องเร่งติดตาม" />
        <WireframeMetric label="Unassigned" value="2" detail="รอผู้รับผิดชอบ" />
      </div>
      {!isSales && (
        <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          <WireframeSection title="Team workload">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="border-b-2 border-slate-300 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="pb-3 pr-4">Member</th>
                    <th className="pb-3 pr-4">Active tasks</th>
                    <th className="pb-3 pr-4">Today</th>
                    <th className="pb-3 pr-4">Overdue</th>
                    <th className="pb-3">Workload</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member, index) => (
                    <tr key={member} className="border-b border-slate-200">
                      <td className="py-4 pr-4 font-bold">{member}</td>
                      <td className="py-4 pr-4">{[8, 6, 10, 4][index]}</td>
                      <td className="py-4 pr-4">{[4, 3, 5, 2][index]}</td>
                      <td className="py-4 pr-4">{[1, 0, 2, 0][index]}</td>
                      <td className="py-4">
                        <div className="h-3 w-28 bg-slate-200">
                          <div
                            className="h-3 bg-slate-900"
                            style={{ width: `${[70, 52, 88, 35][index]}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </WireframeSection>
          <WireframeSection title="Team members">
            <div className="grid gap-3">
              {members.map((member) => (
                <button
                  key={member}
                  type="button"
                  onClick={() => setFilter(member)}
                  className="flex items-center justify-between border border-slate-300 p-3 text-left text-sm font-bold transition-colors duration-150 hover:border-slate-900 hover:bg-slate-50"
                >
                  <span>{member}</span>
                  <span className="text-xs text-green-700">Online</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setFilter("All members")}
              className="mt-3 text-sm font-bold underline transition-colors duration-150 hover:text-slate-600"
            >
              ดูทั้งทีม
            </button>
          </WireframeSection>
        </div>
      )}
      <div className="mt-6 flex flex-wrap gap-2 border-b-2 border-slate-300">
        <button
          type="button"
          onClick={() => setActiveTeamTab("handoff")}
          className={`border-2 px-4 py-3 text-sm font-bold transition-colors ${activeTeamTab === "handoff" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-900 hover:text-slate-900"}`}
        >
          Team handoff
        </button>
        <button
          type="button"
          onClick={() => setActiveTeamTab("task-board")}
          className={`border-2 px-4 py-3 text-sm font-bold transition-colors ${activeTeamTab === "task-board" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-900 hover:text-slate-900"}`}
        >
          Team task board · {taskBoardFilter}
        </button>
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[7fr_3fr]">
        <div className="min-w-0">
        <WireframeSection
          title={`Team task board · ${taskBoardFilter}`}
          className={activeTeamTab === "task-board" ? "" : "hidden"}
          action={
            <span className="border border-slate-300 px-3 py-2 text-xs font-bold">
              {visibleTasks.length} tasks
            </span>
          }
        >
          <div className="mb-4 flex flex-wrap gap-2">
            {!isSales && (
              <select
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                className="h-10 border-2 border-slate-300 px-3 text-sm"
              >
                <option>All members</option>
                {members.map((member) => (
                  <option key={member}>{member}</option>
                ))}
              </select>
            )}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {paginatedTasks.map((task) => (
              <button
                key={task[0]}
                type="button"
                onClick={() => openTaskDialog(task)}
                className="group border-2 border-slate-300 p-0 text-left transition-colors duration-150 hover:border-slate-900"
              >
                <div className="p-3 sm:p-4">
                  <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="border border-slate-300 bg-slate-50 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                          Team task
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          {task[0]}
                        </span>
                      </div>
                      <p className="mt-2 min-h-10 line-clamp-2 text-xs font-bold leading-5 text-slate-900 sm:text-sm">
                        {task[1]}
                      </p>
                    </div>
                    <span
                      className={`inline-flex min-w-24 justify-center border px-3 py-2 text-xs font-bold ${task[3] === "Waiting" ? "border-amber-400 bg-amber-50 text-amber-800" : "border-slate-400 bg-slate-50 text-slate-700"}`}
                    >
                      {task[3]}
                    </span>
                  </div>
                </div>
                <div className="border-t border-slate-200 text-[11px] font-bold">
                  <div className="flex w-full items-center justify-between gap-3 bg-slate-50 px-3 py-2 sm:px-4">
                    <span className="text-slate-500">◷ กำหนดเวลา</span>
                    <strong className="text-right text-slate-900">{task[4]}</strong>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-3 py-2 text-slate-500 sm:px-4">
                    <span>
                      ผู้รับผิดชอบ: <strong className="text-slate-900">{task[2]}</strong>
                    </span>
                    <span className="text-slate-400 group-hover:text-slate-900">
                      เลือก task →
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
            <button
              type="button"
              disabled={teamPage === 1}
              onClick={() => setTeamPage((page) => Math.max(1, page - 1))}
              className="border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← ก่อนหน้า
            </button>
            <span className="text-xs font-bold text-slate-500">
              หน้า {teamPage} / {totalTeamPages}
            </span>
            <button
              type="button"
              disabled={teamPage === totalTeamPages}
              onClick={() => setTeamPage((page) => Math.min(totalTeamPages, page + 1))}
              className="border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ถัดไป →
            </button>
          </div>
        </WireframeSection>
        <WireframeSection
          title="Team handoff · งานที่เพื่อนโยนให้กัน"
          className={activeTeamTab === "handoff" ? "" : "hidden"}
          action={
            <span className="border border-slate-300 px-3 py-2 text-xs font-bold">
              {handoffItems.length} tasks
            </span>
          }
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {paginatedHandoffs.map(([id, from, to, task, due]) => (
              <div
                key={id}
                role="button"
                tabIndex={0}
                onClick={() => openHandoffDialog([id, from, to, task, due])}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openHandoffDialog([id, from, to, task, due]);
                  }
                }}
                className={`group cursor-pointer border-2 p-0 transition-colors duration-150 hover:border-slate-900 ${to === "ยังไม่มีผู้รับ" ? "border-red-400 bg-red-50/30 hover:border-red-600" : "border-slate-300"}`}
              >
                <div className="p-3 sm:p-4">
                  <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="border border-slate-300 bg-slate-50 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                          Team handoff
                        </span>
                        <span className="text-xs font-bold text-slate-500">{id}</span>
                      </div>
                      <p className="mt-2 min-h-10 line-clamp-2 text-xs font-bold leading-5 text-slate-900 sm:text-sm">
                        {task}
                      </p>
                    </div>
                    {to === "ยังไม่มีผู้รับ" ? (
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setTakenTasks((current) => [...current, id]);
                        }}
                        className="inline-flex min-w-24 justify-center border-2 border-red-400 bg-red-50 px-3 py-2 text-xs font-bold text-red-700 transition-colors duration-150 hover:border-red-600 hover:bg-red-600 hover:text-white active:scale-[0.98]"
                      >
                        {takenTasks.includes(id) ? "Taken" : "Take action"}
                      </button>
                    ) : (
                      <span className="inline-flex min-w-24 justify-center border border-slate-400 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700">
                        Handed off
                      </span>
                    )}
                  </div>
                </div>
                <div className="border-t border-slate-200 text-[11px] font-bold">
                  <div className="flex w-full items-center justify-between gap-3 bg-slate-50 px-3 py-2 sm:px-4">
                    <span className="text-slate-500">◷ กำหนดเวลา</span>
                    <strong className="text-right text-slate-900">{due}</strong>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-3 py-2 text-slate-500 sm:px-4">
                    <span>
                      {from} → <strong className="text-slate-900">{takenTasks.includes(id) ? "คุณรับงานแล้ว" : to}</strong>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
            <button
              type="button"
              disabled={teamPage === 1}
              onClick={() => setTeamPage((page) => Math.max(1, page - 1))}
              className="border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← ก่อนหน้า
            </button>
            <span className="text-xs font-bold text-slate-500">
              หน้า {teamPage} / {totalTeamPages}
            </span>
            <button
              type="button"
              disabled={teamPage === totalTeamPages}
              onClick={() => setTeamPage((page) => Math.min(totalTeamPages, page + 1))}
              className="border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ถัดไป →
            </button>
          </div>
        </WireframeSection>
        </div>
        <WireframeSection title="Activity history">
          <div className="relative grid gap-4 text-sm before:absolute before:bottom-6 before:left-7 before:top-6 before:w-px before:bg-slate-300">
            {[
              ["Sales", "เพิ่ม Note ใน TASK-1043", "เมื่อสักครู่", "note"],
              ["Nok", "เพิ่มรูปภาพแนบใน TASK-1043", "เมื่อ 5 นาทีที่แล้ว", "image"],
              ["May", "แก้ Due date ของ TASK-1043 เป็นวันนี้ 16:00", "เมื่อ 12 นาทีที่แล้ว", "date"],
              ["Ton", "เพิ่ม Label: Follow-up ให้ TASK-1043", "เมื่อ 18 นาทีที่แล้ว", "label"],
              ["Manager", "เพิ่ม Checklist ให้ TASK-1043", "เมื่อ 25 นาทีที่แล้ว", "checklist"],
              ["Nok", "มอบหมาย TASK-1043 ให้ May", "10:12", "task"],
              ["Ton", "รับ TASK-1044 แล้ว", "09:48", "task"],
              ["Phet", "เปลี่ยน Due date ของ TASK-1046", "เมื่อวาน", "date"],
              ["Manager", "สร้าง Task ใหม่ให้ทีม", "เมื่อวาน", "task"],
            ].map(([actor, action, time, kind]) => (
              <div key={`${actor}-${action}`} className="relative z-10 flex items-start gap-3 border border-slate-200 bg-slate-50 p-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center bg-slate-900 text-white">
                  <ActivityIcon kind={kind as ActivityKind} />
                </span>
                <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                  <p className="min-w-0 text-xs leading-5 text-slate-600">
                    <strong className="text-slate-900">{actor}</strong> {action}
                  </p>
                  <span className="shrink-0 text-[11px] font-bold text-slate-400">{time}</span>
                </div>
              </div>
            ))}
          </div>
        </WireframeSection>
      </div>
      {dialogTask && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 px-3 py-3 backdrop-blur-sm sm:px-6 sm:py-6"
          onMouseDown={() => setDialogTask(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-task-dialog-title"
            className="flex h-[calc(100vh-2.5rem)] max-h-[calc(100vh-2.5rem)] w-full max-w-[60rem] flex-col overflow-hidden overscroll-contain border-2 border-slate-900 bg-white text-slate-900 shadow-2xl sm:h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-4rem)] lg:h-[80vh] lg:max-h-[80vh]"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="relative flex h-28 shrink-0 items-center justify-center border-b-2 border-slate-300 bg-slate-100 sm:h-48">
              {dialogImage ? (
                <img src={dialogImage} alt="ไฟล์แนบของ Task" className="h-full w-full object-contain" />
              ) : (
                <div className="text-center text-slate-500">
                  <p className="text-xl">▧</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide">Task cover</p>
                </div>
              )}
              <div className="absolute right-4 top-4 flex gap-2">
                <label className="grid h-8 w-8 cursor-pointer place-items-center bg-slate-900 text-base text-white transition-colors hover:bg-slate-700" title="เพิ่มรูป">
                  ▧
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) setDialogImage(URL.createObjectURL(file));
                    }}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setDialogTask(null)}
                  className="grid h-8 w-8 place-items-center bg-slate-900 text-lg leading-none text-white transition-colors hover:bg-slate-700"
                  aria-label="ปิดรายละเอียด Task"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:overflow-hidden">
              <div className="min-w-0 lg:min-h-0 lg:overflow-y-auto">
                <div className="p-5 sm:p-8">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 text-lg text-slate-400">○</span>
                    <div className="min-w-0 flex-1">
                      <h2
                        id="team-task-dialog-title"
                        className="mt-2 break-words text-sm font-bold leading-tight sm:text-lg"
                      >
                        {dialogTask[1]}
                      </h2>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700">
                      {dialogTask[0]}
                    </span>
                    <span className="border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700">
                      {dialogTask[2]}
                    </span>
                    <button
                      type="button"
                      className="border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-50"
                    >
                      ＋ Add
                    </button>
                    <button
                      type="button"
                      className="border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-50"
                    >
                      ◇ Labels
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNoteEditor((visible) => !visible)}
                      className="border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-50"
                    >
                      ＋ Note
                    </button>
                    <label className="cursor-pointer border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-50">
                      ▧ รูป
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) setDialogImage(URL.createObjectURL(file));
                        }}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsEditingDialogDue((editing) => !editing)}
                      className="border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-50"
                    >
                      ◷ วันที่
                    </button>
                    <button
                      type="button"
                      className="border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-50"
                    >
                      ☑ Checklist
                    </button>
                  </div>
                  {showNoteEditor && (
                    <div className="mt-4 border-2 border-slate-300 bg-slate-50 p-3">
                      <label className="grid gap-2 text-xs font-bold text-slate-700">
                        Note
                        <textarea
                          autoFocus
                          value={dialogNote}
                          onChange={(event) => setDialogNote(event.target.value)}
                          placeholder="เขียน Note สำหรับ Task นี้..."
                          className="min-h-24 resize-y border border-slate-300 bg-white p-3 text-xs font-normal text-slate-900 outline-none focus:border-slate-900"
                        />
                      </label>
                    </div>
                  )}
                  <section className="mt-8" aria-labelledby="team-task-description-title">
                    <h3 id="team-task-description-title" className="text-base font-bold">
                      ☰ Description
                    </h3>
                    <p className="mt-4 text-xs leading-7 text-slate-600">
                      งานของทีมที่อยู่ในกระดาน Team task board · All members
                    </p>
                    {dialogNote && !showNoteEditor && (
                      <p className="mt-4 whitespace-pre-wrap border-l-2 border-slate-300 pl-3 text-xs leading-6 text-slate-600">
                        {dialogNote}
                      </p>
                    )}
                  </section>
                  <div className="mt-8 border-t border-slate-200 pt-6 text-xs text-slate-500">
                    <p>
                      Status: <strong className="text-slate-900">{dialogTask[3]}</strong>
                    </p>
                    <p className="mt-3">
                      Due: <strong className="text-slate-900">{dialogDue || dialogTask[4]}</strong>
                    </p>
                    {isEditingDialogDue && (
                      <input
                        value={dialogDue}
                        onChange={(event) => setDialogDue(event.target.value)}
                        aria-label="แก้วันที่ของ Task"
                        className="mt-3 h-9 w-full border-2 border-slate-300 bg-white px-2 text-xs text-slate-900 outline-none focus:border-slate-900"
                      />
                    )}
                  </div>
                </div>
              </div>
              <aside className="min-h-0 overflow-y-auto border-t border-slate-300 bg-slate-50 p-5 sm:p-8 lg:border-l lg:border-t-0">
                <h3 className="text-base font-bold">⌕ Comments and activity</h3>
                <input
                  aria-label="เขียนความคิดเห็น"
                  placeholder="Write a comment..."
                  className="mt-5 w-full border-2 border-slate-300 bg-white px-4 py-3 text-xs text-slate-900 outline-none placeholder:text-slate-500 focus:border-slate-900"
                />
                <div className="mt-6 flex gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center bg-slate-900 font-bold text-white">
                    S
                  </span>
                  <div className="text-xs">
                    <p>
                      <strong>Sales Workspace</strong> added this card to Team task board
                    </p>
                    <p className="mt-2 text-slate-600 underline">อัปเดตล่าสุดวันนี้</p>
                  </div>
                </div>
                <div className="mt-6 border-t border-slate-200 pt-5 text-xs text-slate-500">
                  ผู้รับผิดชอบ: <span className="text-slate-900">{dialogTask[2]}</span>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}
    </WireframeHeader>
  );
}
