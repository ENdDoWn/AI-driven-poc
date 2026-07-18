"use client";

import { useState } from "react";
import Link from "next/link";

const CHAT_CATEGORIES = [
	{ label: "แชททั้งหมด", count: 12, active: true },
	{ label: "แชทของฉัน", count: 4 },
	{ label: "Website Form", count: 6 },
	{ label: "Facebook", count: 3 },
	{ label: "LINE", count: 3 },
	{ label: "จบแชทแล้ว", count: 18 },
];

const CHAT_ITEMS = [
	{ source: "FACEBOOK", title: "คุณเมย์ · สนใจเว็บไซต์ร้านอาหาร", status: "New lead", time: "10:42" },
	{ source: "LINE", title: "บริษัท Green Clinic · ขอใบเสนอราคา", status: "Qualified", time: "10:18", active: true },
	{ source: "WEBSITE FORM", title: "คุณต้น · แบบฟอร์มขอใบเสนอราคา", status: "New lead", time: "10:31" },
	{ source: "FACEBOOK", title: "North Star Studio · สอบถามแพ็กเกจ", status: "Contacted", time: "09:55" },
	{ source: "LINE", title: "Acme Accounting · ส่งข้อมูลเพิ่มเติม", status: "Customer", time: "เมื่อวาน" },
];

type ContractItem = {
	id: number;
	company: string;
	name: string;
	value: string;
	startDate: string;
	status: string;
};

export default function AdminInboxPage() {
	const [showContractDialog, setShowContractDialog] = useState(false);
	const [contracts, setContracts] = useState<ContractItem[]>([]);

	const createContract = (formData: FormData) => {
		const company = String(formData.get("company") ?? "").trim();
		const name = String(formData.get("name") ?? "").trim();
		const value = String(formData.get("value") ?? "").trim();
		const startDate = String(formData.get("startDate") ?? "").trim();
		const status = String(formData.get("status") ?? "Draft").trim();

		if (!company || !name || !value || !startDate) return;

		setContracts((current) => [
			{
				id: Date.now(),
				company,
				name,
				value,
				startDate,
				status,
			},
			...current,
		]);
		setShowContractDialog(false);
	};

	return (
		<div className="grid h-full min-h-0 grid-cols-1 border-t-2 border-slate-300 text-base lg:grid-cols-[210px_300px_minmax(0,1fr)]">
			<aside className="flex min-h-0 flex-col border-r-2 border-slate-300 bg-white">
				<div className="flex items-center justify-between px-5 py-5">
					<h2 className="text-base font-bold">แชท</h2>
					<button
						type="button"
						aria-label="เปิดตัวกรองแชท"
						className="grid h-8 w-8 place-items-center border border-slate-300 text-slate-500 transition-colors hover:border-slate-900 hover:text-slate-900"
					>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
							<path strokeLinecap="round" d="M5 7h14M8 12h8M11 17h2" />
						</svg>
					</button>
				</div>

				<div className="px-5 text-[11px] text-slate-500">รวมทุกช่องทาง</div>

				<nav className="mt-4 grid gap-1 px-3" aria-label="รายการหมวดแชท">
					{CHAT_CATEGORIES.map((category) => (
						<button
							key={category.label}
							type="button"
							className={`flex items-center justify-between px-3 py-2.5 text-left text-xs transition-colors ${
								category.active
									? "border-2 border-slate-900 bg-white font-bold text-slate-900"
									: "text-slate-600 hover:bg-slate-50"
							}`}
						>
							<span>{category.label}</span>
							<span className="text-[11px] text-slate-400">{category.count}</span>
						</button>
					))}
				</nav>

				<div className="mt-auto border-t border-slate-200 px-5 py-4">
					<p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Team</p>
					<p className="mt-3 text-xs font-bold">Sales / Account</p>
					<p className="mt-1 text-[11px] text-slate-500">กำลังออนไลน์ 3 คน</p>
				</div>
			</aside>

			<section className="flex min-h-0 flex-col border-r-2 border-slate-300 bg-white">
				<div className="border-b border-slate-300 px-5 py-5">
					<h3 className="text-base font-bold">แชททั้งหมด</h3>
				</div>

				<div className="min-h-0 flex-1 space-y-1.5 overflow-y-auto p-3">
					{CHAT_ITEMS.map((item) => (
						<Link
							key={`${item.source}-${item.title}`}
							href="/admin/inbox"
							className={`block border-2 p-2.5 transition-colors ${
								item.active
									? "border-slate-900 bg-slate-50"
									: "border-slate-300 bg-white hover:border-slate-900"
							}`}
						>
							<div className="flex items-start justify-between gap-2">
								<span className="border border-slate-400 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide">
									{item.source}
								</span>
								<span className="text-[10px] text-slate-500">{item.time}</span>
							</div>
							<p className="mt-2 text-xs leading-snug font-bold text-slate-900 lg:text-sm">
								{item.title}
							</p>
							<div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
								<span>{item.status}</span>
								<span>Assigned: Sales</span>
							</div>
						</Link>
					))}
				</div>
			</section>

			<section className="flex min-h-0 flex-col bg-slate-50/30 p-4">
				<div className="flex items-center justify-between border-b border-slate-300 bg-white px-5 py-4">
					<h3 className="text-base leading-tight font-bold lg:text-lg">
						คุณเมย์ · สนใจเว็บไซต์ร้านอาหาร
					</h3>
					<button
						type="button"
						onClick={() => setShowContractDialog(true)}
						aria-haspopup="dialog"
						className="border-2 border-slate-900 bg-white px-4 py-2 text-xs font-bold transition-colors hover:bg-slate-900 hover:text-white"
					>
						New Contract
					</button>
				</div>

				{contracts.length > 0 ? (
					<div className="border-x border-b border-slate-300 bg-white px-5 py-3">
						<p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Recent contracts</p>
						<div className="mt-2 space-y-1.5">
							{contracts.slice(0, 2).map((contract) => (
								<div key={contract.id} className="flex items-center justify-between gap-2 border border-slate-300 px-2 py-1.5 text-[11px]">
									<div className="min-w-0">
										<p className="truncate font-bold text-slate-900">{contract.company} · {contract.name}</p>
										<p className="text-slate-500">฿{contract.value} · {contract.startDate}</p>
									</div>
									<span className="shrink-0 border border-slate-400 px-2 py-0.5 font-bold text-slate-600">{contract.status}</span>
								</div>
							))}
						</div>
					</div>
				) : null}

				<div className="flex min-h-0 flex-1 flex-col border border-slate-300 border-t-0 bg-white p-4">
					<div className="min-h-0 flex-1 overflow-y-auto border border-dashed border-slate-300 bg-slate-50 p-4">
						<div className="space-y-3 text-xs">
							<div className="max-w-[78%] border border-slate-300 bg-white p-3">
								สวัสดีค่ะ อยากทำเว็บไซต์ร้านอาหาร มีแพ็กเกจแนะนำไหมคะ?
							</div>
							<div className="ml-auto max-w-[78%] border-2 border-slate-900 bg-white p-3">
								สวัสดีครับ ทีมงานช่วยแนะนำแพ็กเกจให้ได้ครับ ขอทราบประเภทธุรกิจและเป้าหมายเว็บไซต์เบื้องต้นครับ
							</div>
						</div>
					</div>

					<div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
						<div className="h-10 border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-400">พิมพ์ข้อความตอบกลับ...</div>
						<button
							type="button"
							className="h-10 border-2 border-slate-900 bg-slate-900 px-5 text-xs font-bold text-white transition-colors hover:bg-white hover:text-slate-900"
						>
							Send
						</button>
					</div>
				</div>
			</section>

			{showContractDialog ? (
				<div
					className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4"
					onMouseDown={() => setShowContractDialog(false)}
				>
					<div
						role="dialog"
						aria-modal="true"
						aria-labelledby="new-contract-title"
						className="w-full max-w-xl border-2 border-slate-900 bg-white p-5 shadow-xl"
						onMouseDown={(event) => event.stopPropagation()}
					>
						<div className="flex items-center justify-between border-b border-slate-200 pb-3">
							<h4 id="new-contract-title" className="text-base font-bold">New Contract</h4>
							<button
								type="button"
								onClick={() => setShowContractDialog(false)}
								aria-label="ปิดหน้าต่างเพิ่มสัญญา"
								className="border border-slate-300 px-2 py-1 text-xs font-bold hover:border-slate-900"
							>
								X
							</button>
						</div>

						<form
							className="mt-4 grid gap-3"
							onSubmit={(event) => {
								event.preventDefault();
								createContract(new FormData(event.currentTarget));
							}}
						>
							<div className="grid gap-3 sm:grid-cols-2">
								<label className="grid gap-1.5 text-xs font-bold">
									Company
									<input name="company" required className="h-9 border border-slate-300 px-2 text-xs font-normal" placeholder="เช่น Green Clinic" />
								</label>
								<label className="grid gap-1.5 text-xs font-bold">
									Contract name
									<input name="name" required className="h-9 border border-slate-300 px-2 text-xs font-normal" placeholder="เช่น Website Retainer" />
								</label>
								<label className="grid gap-1.5 text-xs font-bold">
									Contract value
									<input name="value" required className="h-9 border border-slate-300 px-2 text-xs font-normal" placeholder="เช่น 250000" />
								</label>
								<label className="grid gap-1.5 text-xs font-bold">
									Start date
									<input type="date" name="startDate" required className="h-9 border border-slate-300 px-2 text-xs font-normal" />
								</label>
							</div>
							<label className="grid gap-1.5 text-xs font-bold">
								Status
								<select name="status" defaultValue="Draft" className="h-9 border border-slate-300 px-2 text-xs font-normal">
									<option>Draft</option>
									<option>Pending</option>
									<option>Active</option>
								</select>
							</label>

							<div className="mt-1 flex justify-end gap-2">
								<button
									type="button"
									onClick={() => setShowContractDialog(false)}
									className="border border-slate-300 px-3 py-2 text-xs font-bold hover:border-slate-900"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="border-2 border-slate-900 bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-white hover:text-slate-900"
								>
									Create Contract
								</button>
							</div>
						</form>
					</div>
				</div>
			) : null}
		</div>
	);
}
