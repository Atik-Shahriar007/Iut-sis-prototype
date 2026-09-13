import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardList,
  Clock3,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  MoreHorizontal,
  Search,
  Settings,
  ShieldCheck,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";

type View = "Dashboard" | "Courses" | "Schedule" | "Results" | "Attendance" | "Profile";

type HomeProps = {
  authenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
};

type Course = {
  code: string;
  name: string;
  faculty: string;
  credit: number;
  section: string;
  instructor: string;
  seats: number;
};

const navItems: { label: View; icon: LucideIcon; hint: string }[] = [
  { label: "Dashboard", icon: LayoutDashboard, hint: "Overview" },
  { label: "Courses", icon: BookOpen, hint: "Registration" },
  { label: "Schedule", icon: CalendarDays, hint: "Weekly plan" },
  { label: "Results", icon: GraduationCap, hint: "Academic record" },
  { label: "Attendance", icon: Activity, hint: "Class presence" },
  { label: "Profile", icon: UserRound, hint: "Personal details" },
];

const availableCourses: Course[] = [
  { code: "SWE 2301", name: "Computer Networking", faculty: "SWE", credit: 3, section: "A", instructor: "Dr. Samiul Karim", seats: 14 },
  { code: "SWE 2303", name: "Engineering Ethics", faculty: "SWE", credit: 2, section: "B", instructor: "Md. Mahmud Hasan", seats: 31 },
  { code: "SWE 2305", name: "Database Management", faculty: "SWE", credit: 3, section: "C", instructor: "Dr. Nusrat Jahan", seats: 7 },
];

const currentCourses = [
  { code: "SWE 2201", name: "Algorithms", type: "Core", day: "Sunday", time: "09:00 — 10:30", room: "Academic Block 3 · 402", tone: "blue" },
  { code: "SWE 2203", name: "Software Requirements & Specifications", type: "Core", day: "Monday", time: "11:00 — 12:30", room: "Academic Block 2 · 201", tone: "mint" },
  { code: "MAT 2205", name: "Probability & Statistics", type: "Core", day: "Tuesday", time: "09:00 — 10:30", room: "Academic Block 3 · 305", tone: "gold" },
  { code: "SWE 2301", name: "Computer Networking", type: "Core", day: "Wednesday", time: "02:00 — 03:30", room: "Academic Block 1 · 107", tone: "rose" },
  { code: "SWE 2303", name: "Engineering Ethics", type: "Core", day: "Thursday", time: "09:00 — 10:30", room: "Academic Block 1 · 107", tone: "mint" },
  { code: "SWE 2305", name: "Database Management", type: "Core", day: "Thursday", time: "11:00 — 12:30", room: "Academic Block 2 · 204", tone: "blue" },
];

function IUTMark({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`brand-lockup ${dark ? "brand-lockup-dark" : ""}`}>
      <div className="brand-mark"><img src="/iut-logo.png" alt="IUT emblem" /></div>
      <div>
        <strong>Student Portal</strong>
        <span>Islamic University of Technology</span>
      </div>
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="login-page">
      <section className="login-story">
        <div className="story-pattern" />
        <div className="login-story-content">
          <IUTMark dark />
          <div className="story-copy">
            <span className="eyebrow eyebrow-light">STUDENT INFORMATION SYSTEM</span>
            <h1>Everything you need for your <em>next chapter.</em></h1>
            <p>One calm, connected space to plan your semester, track your progress, and stay close to campus.</p>
          </div>
          <div className="story-footer"><ShieldCheck size={16} /> Secure access for IUT students</div>
        </div>
      </section>
      <section className="login-panel">
        <div className="login-form-wrap">
          <div className="mobile-mark"><IUTMark /></div>
          <div className="login-heading">
            <span className="eyebrow">WELCOME BACK</span>
            <h2>Sign in to your portal</h2>
            <p>Use your university credentials to continue.</p>
          </div>
          <form onSubmit={(event) => { event.preventDefault(); onLogin(); }}>
            <label className="field-label" htmlFor="student-id">Student ID or email</label>
            <div className="input-wrap"><UserRound size={17} /><input id="student-id" defaultValue="230042116" placeholder="e.g. 230042116" /></div>
            <div className="field-row"><label className="field-label" htmlFor="password">Password</label><button type="button" className="text-button">Forgot password?</button></div>
            <div className="input-wrap"><ShieldCheck size={17} /><input id="password" type={showPassword ? "text" : "password"} defaultValue="password" placeholder="Enter your password" /><button type="button" className="input-action" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button></div>
            <label className="remember-row"><input type="checkbox" defaultChecked /> <span>Remember me on this device</span></label>
            <button className="primary-button login-button" type="submit">Sign in <ArrowRight size={17} /></button>
          </form>
          <div className="login-help"><span>Need help?</span> Contact the <button className="text-button">ICT Centre</button></div>
        </div>
        <div className="login-bottom-note">© 2026 Islamic University of Technology · Bangladesh</div>
      </section>
    </div>
  );
}

function Sidebar({ view, setView, onLogout, open, setOpen }: { view: View; setView: (view: View) => void; onLogout: () => void; open: boolean; setOpen: (open: boolean) => void }) {
  return (
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="sidebar-top"><IUTMark /><button className="mobile-close" onClick={() => setOpen(false)} aria-label="Close navigation"><X size={19} /></button></div>
      <div className="sidebar-label">MAIN MENU</div>
      <nav className="main-nav">
        {navItems.map(({ label, icon: Icon, hint }) => <button key={label} className={`nav-item ${view === label ? "active" : ""}`} onClick={() => { setView(label); setOpen(false); }}><Icon size={18} /><span><strong>{label}</strong><small>{hint}</small></span>{view === label && <span className="active-pip" />}</button>)}
      </nav>
      <div className="sidebar-divider" />
      <div className="sidebar-label">CAMPUS</div>
      <button className="nav-item nav-item-subtle" onClick={() => window.alert("Campus services are available from the IUT main campus portal.")}><UsersRound size={18} /><span><strong>Campus services</strong><small>Library & support</small></span><ArrowRight size={14} /></button>
      <div className="sidebar-bottom"><div className="semester-card"><span className="semester-icon"><CalendarDays size={16} /></span><div><small>ACTIVE SEMESTER</small><strong>Semester 4 · 2025–26</strong></div><ChevronDown size={15} /></div><button className="nav-item nav-item-subtle logout" onClick={onLogout}><LogOut size={18} /><span><strong>Sign out</strong><small>End this session</small></span></button></div>
    </aside>
  );
}

function Topbar({ view, onMenu }: { view: View; onMenu: () => void }) {
  return <header className="topbar"><button className="mobile-menu" onClick={onMenu} aria-label="Open navigation"><Menu size={20} /></button><div className="breadcrumb"><span>Student portal</span><span>/</span><strong>{view}</strong></div><div className="topbar-actions"><button className="icon-button search-button" aria-label="Search"><Search size={18} /></button><button className="icon-button notification-button" aria-label="Notifications"><Bell size={18} /><i /></button><div className="topbar-profile"><div className="avatar avatar-small">AS</div><div><strong>Atik Shahriar</strong><span>230042116</span></div><ChevronDown size={15} /></div></div></header>;
}

function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="page-header"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{action}</div>;
}

function StatCard({ icon: Icon, label, value, detail, tone, progress }: { icon: LucideIcon; label: string; value: string; detail: string; tone: string; progress?: number }) {
  return <div className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={18} /></div><div className="stat-content"><span>{label}</span><strong>{value}</strong><small>{detail}</small>{progress !== undefined && <div className="mini-progress"><i style={{ width: `${progress}%` }} /></div>}</div><MoreHorizontal size={17} className="muted-icon" /></div>;
}

function Dashboard({ setView }: { setView: (view: View) => void }) {
  return <>
    <PageHeader eyebrow="SUNDAY · 08 MARCH 2026" title="Good morning, Atik" description="Here’s your academic snapshot for the Semester 4 · 2025–26 semester." action={<button className="outline-button" onClick={() => setView("Profile")}><UserRound size={16} /> View profile</button>} />
    <div className="stat-grid"><StatCard icon={GraduationCap} label="Current CGPA" value="3.16" detail="+0.12 from last semester" tone="blue" progress={78} /><StatCard icon={BookOpen} label="Registered credits" value="15 / 18" detail="3 credits remaining" tone="gold" progress={83} /><StatCard icon={CalendarDays} label="Classes this week" value="20" detail="4 sessions today" tone="mint" /><StatCard icon={Activity} label="Average attendance" value="91%" detail="Above your 80% target" tone="rose" progress={91} /></div>
    <div className="dashboard-grid"><section className="surface-card next-class-card"><div className="card-heading"><div><span className="eyebrow">UP NEXT · IN 42 MINUTES</span><h2>Algorithms</h2><p>SWE 2201 · Section A</p></div><span className="live-dot"><i /> Starting soon</span></div><div className="next-class-meta"><div><Clock3 size={17} /><span>09:00 — 10:30</span></div><div><CalendarDays size={17} /><span>Sunday, 08 March</span></div><div><BookOpen size={17} /><span>Academic Block 3 · Room 402</span></div></div><div className="next-class-footer"><div className="instructor"><div className="avatar avatar-tiny">SK</div><span><small>Instructor</small><strong>Dr. Samiul Karim</strong></span></div><button className="soft-button" onClick={() => setView("Schedule")}>See full schedule <ArrowRight size={15} /></button></div></section><section className="surface-card announcement-card"><div className="card-heading"><div><span className="eyebrow">FROM CAMPUS</span><h2>Important updates</h2></div><button className="icon-button"><MoreHorizontal size={18} /></button></div><div className="announcement-item"><span className="announcement-mark gold"><Bell size={15} /></span><div><strong>Course registration closes 12 March</strong><p>Review your course selection before the deadline.</p><small>2 hours ago</small></div></div><div className="announcement-item"><span className="announcement-mark blue"><ClipboardList size={15} /></span><div><strong>Midterm schedule is now available</strong><p>Check your updated calendar for exam dates.</p><small>Yesterday</small></div></div><button className="link-button" onClick={() => setView("Courses")}>View all announcements <ArrowRight size={15} /></button></section></div>
    <div className="bottom-grid"><section className="surface-card progress-card"><div className="card-heading"><div><span className="eyebrow">ACADEMIC JOURNEY</span><h2>Degree progress · 102 / 184 credits</h2></div><button className="text-button" onClick={() => setView("Results")}>View record</button></div><div className="degree-progress"><div className="progress-ring"><div><strong>55%</strong><span>complete</span></div></div><div className="progress-legend"><div><span className="legend-dot blue-dot" /><span>Completed credits</span><strong>102</strong></div><div><span className="legend-dot pale-dot" /><span>Remaining credits</span><strong>82</strong></div><div><span className="legend-dot gold-dot" /><span>Expected graduation</span><strong>2028</strong></div></div></div></section><section className="surface-card deadlines-card"><div className="card-heading"><div><span className="eyebrow">YOUR WEEK</span><h2>Upcoming deadlines</h2></div><button className="icon-button"><MoreHorizontal size={18} /></button></div><div className="deadline"><div className="date-block"><strong>10</strong><span>MAR</span></div><div><strong>Software Requirements & Specifications quiz</strong><p>Tuesday · 11:00 AM</p></div><span className="deadline-tag">In 2 days</span></div><div className="deadline"><div className="date-block"><strong>12</strong><span>MAR</span></div><div><strong>Course registration closes</strong><p>Thursday · 11:59 PM</p></div><span className="deadline-tag urgent">Important</span></div></section></div>
  </>;
}

function Courses({ registered, setRegistered, notify }: { registered: string[]; setRegistered: (courses: string[]) => void; notify: (message: string) => void }) {
  const toggle = (course: Course) => { const isRegistered = registered.includes(course.code); setRegistered(isRegistered ? registered.filter((code) => code !== course.code) : [...registered, course.code]); notify(isRegistered ? `${course.code} removed from your registration.` : `${course.code} added to your registration.`); };
  return <><PageHeader eyebrow="ACADEMIC PLANNING" title="Course registration" description="Build your Semester 4 · 2025–26 schedule with confidence." action={<button className="primary-button" onClick={() => notify("Registration changes saved successfully.")}><Check size={16} /> Save changes</button>} /><div className="registration-banner"><div className="banner-icon"><ClipboardList size={20} /></div><div><strong>Registration is open</strong><p>Choose up to 18 credit hours. The add/drop window closes on 12 March 2026.</p></div><div className="banner-progress"><span>{registered.length + 3} / 6 courses</span><div><i style={{ width: `${((registered.length + 3) / 6) * 100}%` }} /></div></div></div><div className="course-toolbar"><div className="search-field"><Search size={17} /><input placeholder="Search courses, code, or instructor" /></div><button className="filter-button">All departments <ChevronDown size={15} /></button><span className="result-count">{availableCourses.length} available courses</span></div><div className="course-layout"><section className="surface-card course-table-card"><div className="table-heading"><div><span className="eyebrow">AVAILABLE THIS SEMESTER</span><h2>Course catalogue</h2></div><button className="icon-button"><MoreHorizontal size={18} /></button></div><div className="course-table"><div className="course-row course-row-head"><span>COURSE</span><span>CREDIT</span><span>SECTION</span><span>INSTRUCTOR</span><span /></div>{availableCourses.map((course) => { const isRegistered = registered.includes(course.code); return <div className="course-row" key={course.code}><div className="course-name"><span className="course-code">{course.code}</span><strong>{course.name}</strong><small>{course.faculty} department</small></div><span>{course.credit} credits</span><span><b className="section-pill">{course.section}</b></span><span className="instructor-cell">{course.instructor}</span><button className={isRegistered ? "registered-button" : "small-outline-button"} onClick={() => toggle(course)}>{isRegistered ? <><Check size={14} /> Added</> : "Register"}</button></div> })}</div></section><aside className="surface-card selection-card"><div className="table-heading"><div><span className="eyebrow">YOUR SELECTION</span><h2>Registration summary</h2></div></div><div className="credit-total"><span>Current load</span><strong>{registered.length + 17}<small> / 18 credits</small></strong><div className="credit-progress"><i style={{ width: `${((registered.length + 17) / 18) * 100}%` }} /></div><small>{18 - registered.length - 17} credits remaining</small></div><div className="selected-list">{[...currentCourses.map((course) => course.code), ...registered].map((code) => { const course = availableCourses.find((item) => item.code === code) || currentCourses.find((item) => item.code === code); return <div className="selected-course" key={code}><span><strong>{code}</strong><small>{course?.name}</small></span><b>{"credit" in (course || {}) ? `${(course as Course).credit} cr` : "3 cr"}</b></div>; })}</div><button className="soft-button full-width" onClick={() => notify("Your registration summary is ready to review.")}>Review registration <ArrowRight size={15} /></button></aside></div></>;
}

function Schedule() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  const scheduleSlots = ["09:00 — 10:30", "11:00 — 12:30", "02:00 — 03:30", "04:00 — 05:30"];
  const shuffledCourses = [
    ["Algorithms", "Probability & Statistics", "Computer Networking", "Engineering Ethics"],
    ["Software Requirements & Specifications", "Database Management", "Algorithms", "Probability & Statistics"],
    ["Computer Networking", "Engineering Ethics", "Software Requirements & Specifications", "Database Management"],
    ["Probability & Statistics", "Algorithms", "Database Management", "Computer Networking"],
    ["Engineering Ethics", "Software Requirements & Specifications", "Probability & Statistics", "Algorithms"],
  ];
  const rooms = ["AB3 · 402", "AB2 · 201", "AB3 · 305", "AB1 · 107"];
  return <><PageHeader eyebrow="SEMESTER 4 · 2025–26 · WEEK 10" title="Class schedule" description="Your week at a glance, with room and instructor details." action={<button className="outline-button"><CalendarDays size={16} /> Export calendar</button>} /><div className="schedule-tabs"><button className="active">Week view</button><button>Day view</button><span>08 — 12 March 2026 <ChevronDown size={15} /></span></div><section className="surface-card timetable-card"><div className="timetable"><div className="time-column"><span /><span>09:00</span><span>11:00</span><span>02:00</span><span>04:00</span><span>05:30</span></div>{days.map((day, dayIndex) => <div className="day-column" key={day}><div className="day-head"><strong>{day.slice(0, 3).toUpperCase()}</strong><span>{day === "Sunday" ? "08" : day === "Monday" ? "09" : day === "Tuesday" ? "10" : day === "Wednesday" ? "11" : "12"}</span></div><div className="day-grid">{shuffledCourses[dayIndex].map((course, index) => <div className={`calendar-class ${["class-blue", "class-mint", "class-gold", "class-rose"][index]}`} style={{ top: `${index * 67 + 4}px` }} key={`${day}-${course}`}><strong>{course}</strong><span>{scheduleSlots[index]}</span><small>{rooms[index]}</small></div>)}</div></div>)}</div></section><div className="schedule-note"><Bell size={17} /><span><strong>Next class:</strong> Algorithms begins at 09:00 in Academic Block 3, Room 402.</span></div></>;
}

function Results() {
  return <><PageHeader eyebrow="ACADEMIC RECORD" title="Results & progress" description="A clear view of your semester performance and degree journey." action={<button className="outline-button"><ClipboardList size={16} /> Download transcript</button>} /><div className="results-summary"><div className="result-hero"><span className="eyebrow eyebrow-light">CURRENT CGPA</span><strong>3.74</strong><span>Excellent standing · Top 12% of your batch</span><div className="result-rule"><i /></div></div><div className="result-mini"><span className="stat-icon gold"><GraduationCap size={18} /></span><span><small>Completed credits</small><strong>102</strong></span></div><div className="result-mini"><span className="stat-icon mint"><BookOpen size={18} /></span><span><small>Semesters completed</small><strong>06</strong></span></div><div className="result-mini"><span className="stat-icon rose"><Activity size={18} /></span><span><small>Academic status</small><strong>Good standing</strong></span></div></div><section className="surface-card results-table-card"><div className="table-heading"><div><span className="eyebrow">SEMESTER RESULTS</span><h2>Semester 4 · 2025–26</h2></div><button className="filter-button">Select semester <ChevronDown size={15} /></button></div><div className="results-table"><div className="result-row result-row-head"><span>COURSE</span><span>CREDITS</span><span>GRADE</span><span>GRADE POINT</span><span>STATUS</span></div>{[{ code: "SWE 2201", name: "Algorithms", credit: "3.0", grade: "A-", point: "3.67" }, { code: "SWE 2203", name: "Software Requirements & Specifications", credit: "3.0", grade: "A", point: "4.00" }, { code: "MAT 2205", name: "Probability & Statistics", credit: "3.0", grade: "B+", point: "3.33" }, { code: "SWE 2207", name: "Database Management", credit: "2.0", grade: "A", point: "4.00" }].map((row) => <div className="result-row" key={row.code}><span className="course-name"><strong>{row.code}</strong><small>{row.name}</small></span><span>{row.credit}</span><span className="grade-badge">{row.grade}</span><span>{row.point}</span><span className="status-pass"><Check size={14} /> Passed</span></div>)}</div><div className="semester-footer"><span>Semester GPA <strong>3.76</strong></span><span>Total credits <strong>11.0</strong></span><span>Last updated 02 March 2026</span></div></section></>;
}

function Attendance() {
  const courses = [{ code: "SWE 2201", name: "Algorithms", percent: 94, attended: "15 / 16", color: "green" }, { code: "SWE 2203", name: "Software Requirements & Specifications", percent: 88, attended: "14 / 16", color: "green" }, { code: "MAT 2205", name: "Probability & Statistics", percent: 81, attended: "13 / 16", color: "gold" }, { code: "SWE 2305", name: "Database Management", percent: 100, attended: "10 / 10", color: "green" }, { code: "SWE 2303", name: "Engineering Ethics", percent: 96, attended: "12 / 12", color: "green" }];
  return <><PageHeader eyebrow="SEMESTER 4 · 2025–26 · WEEK 10" title="Attendance" description="Stay ahead of your attendance targets across every course." action={<button className="filter-button">Semester 4 · 2025–26 <ChevronDown size={15} /></button>} /><div className="attendance-banner"><div className="attendance-score"><div className="score-ring"><strong>91%</strong><span>overall</span></div><div><span className="eyebrow eyebrow-light">ATTENDANCE HEALTH</span><h2>You’re on track</h2><p>Keep above 80% to maintain your good standing.</p></div></div><div className="attendance-facts"><span><strong>52</strong> classes attended</span><span><strong>4</strong> absences this term</span></div></div><section className="surface-card attendance-card"><div className="table-heading"><div><span className="eyebrow">COURSE BREAKDOWN</span><h2>Attendance by course</h2></div><button className="icon-button"><MoreHorizontal size={18} /></button></div><div className="attendance-list">{courses.map((course) => <div className="attendance-row" key={course.code}><div className="attendance-course"><span className="course-square">{course.code.split(" ")[0]}</span><span><strong>{course.name}</strong><small>{course.code} · Semester 4 · 2025–26</small></span></div><div className="attendance-bar"><div><span>Attendance rate</span><strong>{course.percent}%</strong></div><div className="long-progress"><i className={course.color} style={{ width: `${course.percent}%` }} /></div></div><span className={`attendance-status ${course.color}`}>{course.percent >= 90 ? "Excellent" : "On watch"}</span><span className="attended-count">{course.attended}</span><button className="icon-button"><ArrowRight size={16} /></button></div>)}</div></section></>;
}

function Profile() {
  return <><PageHeader eyebrow="ACCOUNT & IDENTITY" title="Student profile" description="Your academic identity and contact information in one place." action={<button className="outline-button"><Settings size={16} /> Account settings</button>} /><div className="profile-layout"><section className="surface-card profile-identity"><div className="profile-cover"><div className="profile-avatar">AS</div></div><div className="profile-body"><h2>Atik Shahriar</h2><p>BSc in Software Engineering · Semester 4</p><span className="verified-badge"><ShieldCheck size={14} /> Verified student</span><div className="identity-meta"><div><small>Student ID</small><strong>230042116</strong></div><div><small>Batch</small><strong>2023 — 2027</strong></div></div></div></section><section className="surface-card details-card"><div className="table-heading"><div><span className="eyebrow">PERSONAL INFORMATION</span><h2>Contact details</h2></div><button className="text-button">Edit details</button></div><div className="details-grid"><div><small>University email</small><strong>atik.shahriar@iut-dhaka.edu</strong></div><div><small>Phone number</small><strong>+880 1712 345 678</strong></div><div><small>Department</small><strong>Software Engineering</strong></div><div><small>Faculty</small><strong>Faculty of Science & Technical Education</strong></div><div><small>Date of birth</small><strong>14 February 2003</strong></div><div><small>Nationality</small><strong>Bangladeshi</strong></div></div></section><section className="surface-card advisor-card"><span className="eyebrow">ACADEMIC ADVISOR</span><div className="advisor-row"><div className="avatar avatar-medium">RH</div><div><strong>Reaz Hasan Joarder</strong><span>Lecturer · CSE</span><small>reaz.hasan.joarder@iut-dhaka.edu</small></div><button className="icon-button"><ArrowRight size={16} /></button></div></section></div></>;
}

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return <div className="toast"><span className="toast-check"><Check size={15} /></span><span>{message}</span><button onClick={onClose}><X size={15} /></button></div>;
}

export default function Home({ authenticated, onLogin, onLogout }: HomeProps) {
  const [view, setView] = useState<View>("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [registered, setRegistered] = useState<string[]>([]);
  const [toast, setToast] = useState("");
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2800); };

  if (!authenticated) return <LoginScreen onLogin={onLogin} />;

  return <div className="app-shell"><Sidebar view={view} setView={setView} onLogout={onLogout} open={sidebarOpen} setOpen={setSidebarOpen} />{sidebarOpen && <button className="sidebar-scrim" onClick={() => setSidebarOpen(false)} aria-label="Close navigation overlay" /> }<main className="main-area"><Topbar view={view} onMenu={() => setSidebarOpen(true)} /><div className="content-area">{view === "Dashboard" && <Dashboard setView={setView} />}{view === "Courses" && <Courses registered={registered} setRegistered={setRegistered} notify={notify} />}{view === "Schedule" && <Schedule />}{view === "Results" && <Results />}{view === "Attendance" && <Attendance />}{view === "Profile" && <Profile />}</div></main>{toast && <Toast message={toast} onClose={() => setToast("")} />}</div>;
}
