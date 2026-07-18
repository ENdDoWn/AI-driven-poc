"use client";

import { useEffect, useState } from "react";
import { WireframeHeader, WireframeMetric, WireframeSection } from "@/components/WireframeShell";

const members = ["Nok · Sales", "Ton · Account Manager", "May · Sales", "Phet · Sales Lead"];
const initialTasks = [
  ["TASK-1042", "โทรยืนยันความต้องการ · Green Clinic", "Nok · Sales", "In progress", "วันนี้ 10:30"],
  ["TASK-1043", "ส่งแพ็กเกจ · Lanna Cafe", "May · Sales", "Assigned", "วันนี้ 11:00"],
  ["TASK-1044", "อัปเดต Proposal · Acme Accounting", "Ton · Account Manager", "In progress", "วันนี้ 13:00"],
  ["TASK-1045", "ประสาน QA · Bright Home", "Nok · Sales", "Waiting", "วันนี้ 13:30"],
  ["TASK-1046", "ติดตาม Contract · Green Clinic", "Phet · Sales Lead", "Assigned", "ภายใน 30 วัน"],
];

export default function SalesTeamPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selected, setSelected] = useState(tasks[0]);
  const [assignee, setAssignee] = useState(tasks[0][2]);
  const [filter, setFilter] = useState("All members");
  const [takenTasks, setTakenTasks] = useState<string[]>([]);
  const [currentRole, setCurrentRole] = useState("Sales Manager");

  useEffect(() => {
    const role = window.localStorage.getItem("wop-demo-role");
    if (role) setCurrentRole(role);
  }, []);
  const visibleTasks = filter === "All members" ? tasks : tasks.filter((task) => task[2] === filter);

  const reassign = () => {
    if (!selected) return;
    const updated = selected.map((value, index) => index === 2 ? assignee : value) as typeof selected;
    setTasks((current) => current.map((task) => task[0] === selected[0] ? updated : task));
    setSelected(updated);
  };

  return <WireframeHeader area="CRM & Sales Team" title="Sales Team" role={currentRole}>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><WireframeMetric label="Team tasks" value="24" detail="งานทั้งหมดของทีม" /><WireframeMetric label="In progress" value="11" detail="กำลังดำเนินการ" /><WireframeMetric label="Overdue" value="3" detail="ต้องเร่งติดตาม" /><WireframeMetric label="Unassigned" value="2" detail="รอผู้รับผิดชอบ" /></div>
    <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]"><WireframeSection title="Team workload"><div className="overflow-x-auto"><table className="w-full min-w-[640px] text-left text-sm"><thead className="border-b-2 border-slate-300 text-xs uppercase tracking-wide text-slate-500"><tr><th className="pb-3 pr-4">Member</th><th className="pb-3 pr-4">Active tasks</th><th className="pb-3 pr-4">Today</th><th className="pb-3 pr-4">Overdue</th><th className="pb-3">Workload</th></tr></thead><tbody>{members.map((member, index) => <tr key={member} className="border-b border-slate-200"><td className="py-4 pr-4 font-bold">{member}</td><td className="py-4 pr-4">{[8, 6, 10, 4][index]}</td><td className="py-4 pr-4">{[4, 3, 5, 2][index]}</td><td className="py-4 pr-4">{[1, 0, 2, 0][index]}</td><td className="py-4"><div className="h-3 w-28 bg-slate-200"><div className="h-3 bg-slate-900" style={{ width: `${[70, 52, 88, 35][index]}%` }} /></div></td></tr>)}</tbody></table></div></WireframeSection><WireframeSection title="Team members"><div className="grid gap-3">{members.map((member) => <button key={member} type="button" onClick={() => setFilter(member)} className="flex items-center justify-between border border-slate-300 p-3 text-left text-sm font-bold transition-colors duration-150 hover:border-slate-900 hover:bg-slate-50"><span>{member}</span><span className="text-xs text-green-700">Online</span></button>)}</div><button type="button" onClick={() => setFilter("All members")} className="mt-3 text-sm font-bold underline transition-colors duration-150 hover:text-slate-600">ดูทั้งทีม</button></WireframeSection></div>
    <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]"><WireframeSection title={`Team task board · ${filter}`}><div className="mb-4 flex flex-wrap gap-2"><select value={filter} onChange={(event) => setFilter(event.target.value)} className="h-10 border-2 border-slate-300 px-3 text-sm"><option>All members</option>{members.map((member) => <option key={member}>{member}</option>)}</select><span className="border border-slate-300 px-3 py-2 text-xs font-bold">{visibleTasks.length} tasks</span></div><div className="grid gap-3">{visibleTasks.map((task) => <button key={task[0]} type="button" onClick={() => { setSelected(task); setAssignee(task[2]); }} className={`border-2 p-4 text-left transition-colors duration-150 hover:border-slate-900 ${selected?.[0] === task[0] ? "border-slate-900 bg-slate-50" : "border-slate-300"}`}><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold text-slate-500">{task[0]}</p><p className="mt-2 font-bold">{task[1]}</p><p className="mt-2 text-xs text-slate-500">ผู้รับผิดชอบ: {task[2]} · {task[4]}</p></div><span className="border border-slate-400 px-2 py-1 text-xs font-bold">{task[3]}</span></div></button>)}</div></WireframeSection><WireframeSection title="Task handoff"><div className="grid gap-4"><p className="text-sm text-slate-600">เลือก Task จากรายการ แล้วมอบหมายให้สมาชิกคนอื่นในทีมทำแทน</p>{selected ? <><div className="border-2 border-slate-300 p-4"><p className="text-xs font-bold text-slate-500">{selected[0]}</p><p className="mt-2 font-bold">{selected[1]}</p><p className="mt-2 text-sm text-slate-500">จาก: {selected[2]}</p></div><label className="grid gap-2 text-sm font-bold">มอบหมายให้<select value={assignee} onChange={(event) => setAssignee(event.target.value)} className="h-11 border-2 border-slate-300 px-3">{members.map((member) => <option key={member}>{member}</option>)}</select></label><button type="button" onClick={reassign} className="border-2 border-slate-900 bg-slate-900 px-4 py-3 text-sm font-bold text-white transition-colors duration-150 hover:bg-slate-700 active:scale-[0.98]">มอบหมาย Task</button></> : <p className="text-sm text-slate-500">เลือก Task เพื่อเริ่มส่งต่องาน</p>}</div></WireframeSection></div>
    <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]"><WireframeSection title="Team handoff · งานที่เพื่อนโยนให้กัน"><div className="grid gap-3">{[["HANDOFF-01", "Nok · Sales", "Ton · Account Manager", "ช่วย Follow-up Green Clinic", "วันนี้ 15:00"], ["HANDOFF-02", "May · Sales", "ยังไม่มีผู้รับ", "ช่วยตรวจ Proposal · Acme Accounting", "วันนี้ 16:00"], ["HANDOFF-03", "Phet · Sales Lead", "May · Sales", "ประสาน QA · Bright Home", "พรุ่งนี้ 10:00"]].map(([id, from, to, task, due]) => <div key={id} className="border-2 border-slate-300 p-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-bold text-slate-500">{id}</p><p className="mt-2 font-bold">{task}</p><p className="mt-2 text-sm text-slate-500">{from} → {takenTasks.includes(id) ? "คุณรับงานแล้ว" : to} · {due}</p></div>{to === "ยังไม่มีผู้รับ" && <button type="button" onClick={() => setTakenTasks((current) => [...current, id])} className="border-2 border-slate-900 px-3 py-2 text-xs font-bold transition-colors duration-150 hover:bg-slate-900 hover:text-white active:scale-[0.98]">{takenTasks.includes(id) ? "Taken" : "Take action"}</button>}</div></div>)}</div></WireframeSection><WireframeSection title="Activity history"><div className="grid gap-3 text-sm">{["Nok มอบหมาย TASK-1043 ให้ May · 10:12", "Ton รับ TASK-1044 แล้ว · 09:48", "Phet เปลี่ยน Due date ของ TASK-1046 · เมื่อวาน", "Manager สร้าง Task ใหม่ให้ทีม · เมื่อวาน"].map((activity) => <div key={activity} className="border-l-2 border-slate-300 pl-4">{activity}</div>)}</div></WireframeSection></div>
  </WireframeHeader>;
}
