"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  WireframeHeader,
  WireframeMetric,
  WireframeSection,
} from "@/components/WireframeShell";

const groups = [
  "All tasks",
  "Lead Follow-up",
  "Deal",
  "Customer Care",
  "Ticket",
  "Contract / Renewal",
] as const;
type Group = (typeof groups)[number];
type Task = {
  id: number;
  title: string;
  category: Exclude<Group, "All tasks">;
  due: string;
  status: string;
  href: string;
  detail: string;
  assignee?: string;
  image?: string;
};
const salesTeam = [
  "Nok · Sales",
  "Ton · Account Manager",
  "May · Sales",
  "Phet · Sales Lead",
];
const tasksPerPage = 6;

const formatDue = (value: string) => {
  if (!value.includes("T")) return value;
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "โทรยืนยันความต้องการ · Green Clinic",
    category: "Lead Follow-up",
    due: "วันนี้ 10:30",
    status: "Overdue",
    href: "/admin/leads",
    detail: "ยืนยันประเภทธุรกิจ เป้าหมายเว็บไซต์ และงบประมาณเบื้องต้น",
    assignee: "Nok · Sales",
  },
  {
    id: 2,
    title: "ส่งแพ็กเกจ · Lanna Cafe",
    category: "Lead Follow-up",
    due: "วันนี้ 11:00",
    status: "Today",
    href: "/admin/inbox",
    detail: "ส่งแพ็กเกจ Website Starter และนัดหมายรอบถัดไป",
  },
  {
    id: 3,
    title: "อัปเดต Proposal · Acme Accounting",
    category: "Deal",
    due: "วันนี้ 13:00",
    status: "Today",
    href: "/admin/deals",
    detail: "ปรับ scope และเพิ่มบริการ Content ตามที่ลูกค้าขอ",
  },
  {
    id: 4,
    title: "ประสาน QA · Bright Home",
    category: "Customer Care",
    due: "วันนี้ 13:30",
    status: "Waiting",
    href: "/admin/tickets",
    detail: "ติดตามผล QA และแจ้งกำหนดส่งให้ลูกค้า",
  },
  {
    id: 5,
    title: "ตอบ Ticket #TK-1042 · Green Clinic",
    category: "Ticket",
    due: "วันนี้ 14:00",
    status: "Today",
    href: "/admin/tickets",
    detail: "รอข้อมูลจาก Production ก่อนตอบกลับลูกค้า",
  },
  {
    id: 6,
    title: "ติดตาม Contract ต่ออายุ · Green Clinic",
    category: "Contract / Renewal",
    due: "ภายใน 30 วัน",
    status: "Upcoming",
    href: "/admin/contracts",
    detail: "เตรียมข้อเสนอ renewal และตรวจสอบบริการเพิ่มเติม",
  },
  {
    id: 7,
    title: "ขอ Feedback เว็บไซต์ · Bright Home",
    category: "Customer Care",
    due: "เมื่อวาน",
    status: "Done",
    href: "/admin/companies",
    detail: "ลูกค้าส่ง feedback กลับมาแล้ว",
  },
];

export default function SalesWorkspacePage() {
  const [activeGroup, setActiveGroup] = useState<Group>("All tasks");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDetail, setNewDetail] = useState("");
  const [newCategory, setNewCategory] =
    useState<Exclude<Group, "All tasks">>("Lead Follow-up");
  const [newDue, setNewDue] = useState("");
  const newAssignee = "ทีมส่วนกลาง";
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditingDetail, setIsEditingDetail] = useState(false);
  const [draftDetail, setDraftDetail] = useState("");

  useEffect(() => {
    if (!selectedTask) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedTask(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedTask]);

  useEffect(() => {
    if (!selectedTask && !showForm) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedTask, showForm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeGroup]);

  const visibleTasks =
    activeGroup === "All tasks"
      ? tasks
      : tasks.filter((task) => task.category === activeGroup);
  const totalPages = Math.max(1, Math.ceil(visibleTasks.length / tasksPerPage));
  const paginatedTasks = visibleTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage,
  );
  const openTask = (task: Task) => {
    setSelectedTask(task);
    setDraftDetail(task.detail);
    setIsEditingDetail(false);
  };
  const addTask = () => {
    if (!newTitle.trim() || !newDue) return;
    const task: Task = {
      id: Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      due: formatDue(newDue),
      status: "Today",
      href: "/admin/my-work",
      detail: newDetail.trim(),
      assignee: newAssignee,
    };
    setTasks((current) => [task, ...current]);
    openTask(task);
    setNewTitle("");
    setNewDetail("");
    setShowForm(false);
  };
  const completeTask = () => {
    if (!selectedTask) return;
    const updated = { ...selectedTask, status: "Done" };
    setTasks((current) =>
      current.map((task) => (task.id === updated.id ? updated : task)),
    );
    setSelectedTask(updated);
  };
  const saveDetail = () => {
    if (!selectedTask) return;
    const updated = { ...selectedTask, detail: draftDetail.trim() };
    setTasks((current) =>
      current.map((task) => (task.id === updated.id ? updated : task)),
    );
    setSelectedTask(updated);
    setDraftDetail(updated.detail);
    setIsEditingDetail(false);
  };
  const removeDetail = () => {
    if (!selectedTask) return;
    const updated = { ...selectedTask, detail: "" };
    setTasks((current) =>
      current.map((task) => (task.id === updated.id ? updated : task)),
    );
    setSelectedTask(updated);
    setDraftDetail("");
    setIsEditingDetail(false);
  };

  return (
    <WireframeHeader area="CRM & Customer" title="Sales Workspace" role="Sales">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <WireframeMetric
          label="My tasks"
          value={String(tasks.length)}
          detail="งานทั้งหมดที่รับผิดชอบ"
        />
        <WireframeMetric
          label="Due today"
          value={String(
            tasks.filter(
              (task) => task.status === "Today" || task.status === "Overdue",
            ).length,
          )}
          detail="ต้องทำภายในวันนี้"
        />
        <WireframeMetric
          label="Overdue"
          value={String(
            tasks.filter((task) => task.status === "Overdue").length,
          )}
          detail="ต้องเร่งติดตาม"
        />
        <WireframeMetric
          label="Completed"
          value={String(tasks.filter((task) => task.status === "Done").length)}
          detail="เสร็จแล้วในสัปดาห์นี้"
        />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[240px_1fr]">
        <WireframeSection title="Task categories" className="self-start">
          <div className="grid gap-1">
            {groups.map((group) => (
              <button
                key={group}
                type="button"
                onClick={() => setActiveGroup(group)}
                className={`flex items-center justify-between border px-3 py-3 text-left text-sm font-bold transition-colors duration-150 ${activeGroup === group ? "border-slate-900 bg-slate-900 text-white" : "border-transparent text-slate-600 hover:border-slate-300"}`}
              >
                <span>{group}</span>
                <span className="ml-auto tabular-nums">
                  {group === "All tasks"
                    ? tasks.length
                    : tasks.filter((task) => task.category === group).length}
                </span>
              </button>
            ))}
          </div>
        </WireframeSection>
        <WireframeSection
          title={activeGroup}
          action={
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="border-2 border-slate-900 bg-slate-900 px-4 py-2 text-sm font-bold text-white transition-colors duration-150 hover:bg-slate-700 active:scale-[0.98]"
            >
              + เพิ่ม Task
            </button>
          }
        >
          <div className="grid gap-4 md:grid-cols-2">
            {paginatedTasks.map((task) => (
              <button
                key={task.id}
                type="button"
                aria-haspopup="dialog"
                onClick={() => openTask(task)}
                className={`group border-2 p-0 text-left transition-colors duration-150 hover:border-slate-900 ${task.status === "Overdue" ? "border-red-400 bg-red-50/30 hover:border-red-600" : selectedTask?.id === task.id ? "border-slate-900 bg-slate-50" : "border-slate-300"}`}
              >
                <div className="p-4 sm:p-5">
                  <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="border border-slate-300 bg-slate-50 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                        {task.category}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        Task #{String(task.id).padStart(4, "0")}
                      </span>
                    </div>
                    <p className="mt-3 line-clamp-1 text-sm font-bold leading-6 text-slate-900 sm:text-base">
                      {task.title}
                    </p>
                    <p className="mt-2 min-h-12 line-clamp-2 text-sm leading-6 text-slate-600">
                      {task.detail}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:block sm:text-right">
                    <span
                      className={`inline-flex min-w-24 justify-center border px-3 py-2 text-xs font-bold ${task.status === "Overdue" ? "border-red-400 bg-red-50 text-red-700" : task.status === "Done" ? "border-green-400 bg-green-50 text-green-700" : task.status === "Waiting" ? "border-amber-400 bg-amber-50 text-amber-800" : "border-slate-400 bg-slate-50 text-slate-700"}`}
                    >
                      {task.status}
                    </span>
                  </div>
                </div>
                </div>
                <div className="border-t border-slate-200 text-xs font-bold">
                  <div className="flex w-full items-center justify-between gap-3 bg-slate-50 px-4 py-3 sm:px-5">
                    <span className="text-slate-500">◷ กำหนดเวลา</span>
                    <strong className="text-slate-900">{task.due}</strong>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 px-4 py-3 text-slate-500 sm:px-5">
                    <span>ผู้รับผิดชอบ: <strong className="text-slate-900">{task.assignee ?? "ยังไม่มอบหมาย"}</strong></span>
                    <span className="text-slate-400 group-hover:text-slate-900">เปิดรายละเอียด →</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                className="border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← ก่อนหน้า
              </button>
              <span className="text-xs font-bold text-slate-500">
                หน้า {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                className="border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ถัดไป →
              </button>
            </div>
          )}
        </WireframeSection>
      </div>
      {selectedTask && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 px-3 py-3 backdrop-blur-sm sm:px-6 sm:py-6"
          onMouseDown={() => setSelectedTask(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-detail-title"
            className="flex max-h-[calc(100vh-1.5rem)] w-full max-w-[60rem] flex-col overflow-hidden overscroll-contain border-2 border-slate-900 bg-white text-slate-900 shadow-2xl lg:max-h-[84vh]"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="relative flex h-28 shrink-0 items-center justify-center border-b-2 border-slate-300 bg-slate-100 sm:h-48">
              {selectedTask.image ? (
                <img
                  src={selectedTask.image}
                  alt="ไฟล์แนบของ Task"
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="text-center text-slate-500">
                  <p className="text-xl">▧</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide">
                    Task cover
                  </p>
                </div>
              )}
              <div className="absolute right-4 top-4 flex gap-2">
                <label
                  className="grid h-8 w-8 cursor-pointer place-items-center bg-slate-900 text-base text-white transition-colors hover:bg-slate-700"
                  title="เพิ่มภาพ"
                >
                  ▧
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        const image = URL.createObjectURL(file);
                        setSelectedTask({ ...selectedTask, image });
                        setTasks((current) =>
                          current.map((task) =>
                            task.id === selectedTask.id
                              ? { ...task, image }
                              : task,
                          ),
                        );
                      }
                    }}
                  />
                </label>
                <button
                  type="button"
                  className="grid h-8 w-8 place-items-center bg-slate-900 text-base text-white transition-colors hover:bg-slate-700"
                  aria-label="เมนูเพิ่มเติม"
                >
                  ···
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTask(null)}
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
                        id="task-detail-title"
                        className="mt-2 break-words text-sm font-bold leading-tight sm:text-lg"
                      >
                        {selectedTask.title}
                      </h2>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
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
                      className="border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-50"
                    >
                      ◷ Dates
                    </button>
                    <button
                      type="button"
                      className="border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-50"
                    >
                      ☑ Checklist
                    </button>
                      <span className="border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700">
                      {selectedTask.assignee ?? "ยังไม่มอบหมาย"}
                    </span>
                  </div>
                  <section
                    className="mt-8"
                    aria-labelledby="task-description-title"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3
                        id="task-description-title"
                        className="text-base font-bold"
                      >
                        ☰ Description
                      </h3>
                      {isEditingDetail ? (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={saveDetail}
                            className="border-2 border-slate-900 bg-slate-900 px-3 py-1 text-xs font-bold text-white hover:bg-slate-700"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setDraftDetail(selectedTask.detail);
                              setIsEditingDetail(false);
                            }}
                            className="border border-slate-300 px-3 py-1 text-xs font-bold"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setDraftDetail(selectedTask.detail);
                            setIsEditingDetail(true);
                          }}
                          className="border border-slate-300 px-3 py-1 text-xs font-bold hover:bg-slate-800"
                        >
                          {selectedTask.detail ? "Edit" : "+ Add"}
                        </button>
                      )}
                    </div>
                    {isEditingDetail ? (
                      <textarea
                        autoFocus
                        value={draftDetail}
                        onChange={(event) => setDraftDetail(event.target.value)}
                        className="mt-4 min-h-32 w-full border-2 border-slate-300 bg-white p-3 text-xs leading-6 text-slate-900"
                        placeholder="เพิ่มรายละเอียดของ Task"
                      />
                    ) : selectedTask.detail ? (
                      <p className="mt-4 whitespace-pre-wrap text-xs leading-7 text-slate-600">
                        {selectedTask.detail}
                      </p>
                    ) : (
                      <p className="mt-4 text-xs text-slate-500">
                        ยังไม่มีรายละเอียด
                      </p>
                    )}
                    {isEditingDetail && selectedTask.detail && (
                      <button
                        type="button"
                        onClick={removeDetail}
                        className="mt-2 text-left text-xs font-bold text-red-700 hover:underline"
                      >
                        Remove detail
                      </button>
                    )}
                  </section>
                  <section
                    className="mt-8 border-t border-slate-200 pt-6"
                    aria-labelledby="task-attachments-title"
                  >
                    <div className="flex items-center justify-between">
                      <h3
                        id="task-attachments-title"
                        className="text-base font-bold"
                      >
                        ⌕ Attachments
                      </h3>
                      <label className="cursor-pointer border border-slate-300 px-3 py-1 text-xs font-bold hover:bg-slate-800">
                        Add
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) {
                              const image = URL.createObjectURL(file);
                              setSelectedTask({ ...selectedTask, image });
                              setTasks((current) =>
                                current.map((task) =>
                                  task.id === selectedTask.id
                                    ? { ...task, image }
                                    : task,
                                ),
                              );
                            }
                          }}
                        />
                      </label>
                    </div>
                    {selectedTask.image ? (
                      <div className="mt-4 flex items-center gap-3 border border-slate-300 bg-slate-50 p-2">
                        <img
                          src={selectedTask.image}
                          alt="ตัวอย่างไฟล์แนบ"
                          className="h-16 w-20 bg-white object-contain"
                        />
                        <div className="min-w-0">
                          <p className="truncate font-bold">task-image.png</p>
                          <p className="text-xs text-slate-500">
                            ไฟล์แนบของ Task
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-4 text-xs text-slate-500">
                        ยังไม่มีไฟล์แนบ
                      </p>
                    )}
                  </section>
                  <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-6 text-xs">
                    <span className="text-slate-500">
                      Due:{" "}
                      <strong className="text-slate-900">
                        {selectedTask.due}
                      </strong>
                    </span>
                    <span className="text-slate-500">
                      Status:{" "}
                      <strong className="text-slate-900">
                        {selectedTask.status}
                      </strong>
                    </span>
                    <button
                      type="button"
                      onClick={completeTask}
                      className="ml-auto border-2 border-slate-900 bg-slate-900 px-3 py-2 font-bold text-white hover:bg-slate-700"
                    >
                      ทำเครื่องหมายเสร็จ
                    </button>
                    <Link
                      href={selectedTask.href}
                      className="border border-slate-300 px-3 py-2 font-bold hover:bg-slate-50"
                    >
                      เปิดหน้าที่เกี่ยวข้อง →
                    </Link>
                  </div>
                </div>
              </div>
              <aside className="min-h-0 overflow-y-auto border-t border-slate-300 bg-slate-50 p-5 sm:p-8 lg:border-l lg:border-t-0">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-bold">
                    ▤ Comments and activity
                  </h3>
                  <button
                    type="button"
                    className="border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Show details
                  </button>
                </div>
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
                      <strong>Sales Workspace</strong> added this card to{" "}
                      <strong>{selectedTask.category}</strong>
                    </p>
                    <p className="mt-2 text-slate-600 underline">
                      วันนี้ · {selectedTask.due}
                    </p>
                  </div>
                </div>
                <div className="mt-6 border-t border-slate-200 pt-5 text-xs text-slate-500">
                  <p>
                    ผู้รับผิดชอบ:{" "}
                    <span className="text-slate-900">
                      {selectedTask.assignee ?? "ยังไม่มอบหมาย"}
                    </span>
                  </p>
                  <label className="mt-4 grid gap-2 text-xs font-bold text-slate-700">
                    มอบหมายให้
                    <select
                      value={selectedTask.assignee ?? ""}
                      onChange={(event) => {
                        const assignee = event.target.value;
                        const updated = { ...selectedTask, assignee };
                        setSelectedTask(updated);
                        setTasks((current) =>
                          current.map((task) =>
                            task.id === selectedTask.id ? updated : task,
                          ),
                        );
                      }}
                      className="h-10 border-2 border-slate-300 bg-white px-2 font-normal text-slate-900"
                    >
                      <option value="">ยังไม่มอบหมาย</option>
                      {salesTeam.map((member) => (
                        <option key={member}>{member}</option>
                      ))}
                      <option value="ทีมส่วนกลาง">ทีมส่วนกลาง</option>
                    </select>
                  </label>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 px-6 backdrop-blur-sm">
          <div className="max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-y-auto border-2 border-slate-900 bg-white p-6 overscroll-contain">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">เพิ่ม Task</h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-xl font-bold transition-transform duration-150 hover:scale-110"
                aria-label="ปิด"
              >
                ×
              </button>
            </div>
            <div className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm font-bold">
                ชื่องาน
                <input
                  value={newTitle}
                  onChange={(event) => setNewTitle(event.target.value)}
                  className="h-11 border-2 border-slate-300 px-3"
                  placeholder="เช่น โทรติดตาม Lead ใหม่"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold">
                รายละเอียดงาน
                <textarea
                  value={newDetail}
                  onChange={(event) => setNewDetail(event.target.value)}
                  className="h-32 resize-none overflow-y-auto border-2 border-slate-300 px-3 py-2"
                  placeholder="อธิบายสิ่งที่ต้องทำหรือข้อมูลที่ต้องติดตาม"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold">
                หมวดงาน
                <select
                  value={newCategory}
                  onChange={(event) =>
                    setNewCategory(
                      event.target.value as Exclude<Group, "All tasks">,
                    )
                  }
                  className="h-11 border-2 border-slate-300 px-3"
                >
                  {groups.slice(1).map((group) => (
                    <option key={group}>{group}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold">
                กำหนดการ
                <input
                  type="datetime-local"
                  required
                  value={newDue}
                  onChange={(event) => setNewDue(event.target.value)}
                  className="h-11 border-2 border-slate-300 px-3"
                />
              </label>
              <button
                type="button"
                onClick={addTask}
                className="border-2 border-slate-900 bg-slate-900 px-4 py-3 text-sm font-bold text-white transition-colors duration-150 hover:bg-slate-700 active:scale-[0.98]"
              >
                บันทึก Task
              </button>
            </div>
          </div>
        </div>
      )}
    </WireframeHeader>
  );
}
