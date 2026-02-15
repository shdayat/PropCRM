import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calculator, 
  PieChart, 
  Home, 
  Plus, 
  Search, 
  TrendingUp, 
  DollarSign, 
  CheckCircle, 
  AlertTriangle,
  Activity,
  ChevronRight,
  Lock,
  LogOut,
  X,
  Edit2,
  Trash2,
  Save,
  Briefcase,
  Shield
} from 'lucide-react';

// --- Utilitas & Konfigurasi UI ---

// Mapping warna statis untuk memastikan Tailwind merender kelas dengan benar
const COLOR_MAP = {
  blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-100", light: "bg-blue-50" },
  green: { bg: "bg-green-100", text: "text-green-600", border: "border-green-100", light: "bg-green-50" },
  orange: { bg: "bg-orange-100", text: "text-orange-600", border: "border-orange-100", light: "bg-orange-50" },
  purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-100", light: "bg-purple-50" },
  red: { bg: "bg-red-100", text: "text-red-600", border: "border-red-100", light: "bg-red-50" },
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, variant = "primary", className = "", disabled = false, type = "button" }) => {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
  };
  return (
    <button 
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-2.5 rounded-xl font-medium transition-transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// --- Komponen Modal (Pop-up) ---

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100 opacity-100">
        <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-lg">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-4 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- View: Login ---

const LoginView = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, pin, setError);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 font-sans">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-blue-200">
            <Home size={32} />
          </div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">PropCRM <span className="text-blue-600">AI</span></h1>
          <p className="text-slate-500 mt-2 text-sm">Masuk untuk mengakses sistem</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Username</label>
            <div className="relative mt-1">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-medium"
                placeholder="Contoh: admin"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">PIN Akses</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-medium"
                placeholder="****"
                maxLength={6}
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-xs font-medium rounded-xl flex items-center gap-2 border border-red-100">
              <AlertTriangle size={14} /> {error}
            </div>
          )}

          <Button className="w-full py-3 mt-4" type="submit">
            Masuk Aplikasi
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 text-center">
          <p className="text-xs text-slate-400 mb-2 font-semibold uppercase">Akun Demo</p>
          <div className="flex flex-wrap justify-center gap-2 text-[10px] text-slate-500">
            <span className="px-2 py-1 bg-slate-100 rounded cursor-pointer hover:bg-slate-200" onClick={() => {setUsername('admin'); setPin('1234')}}>admin / 1234</span>
            <span className="px-2 py-1 bg-slate-100 rounded cursor-pointer hover:bg-slate-200" onClick={() => {setUsername('sales'); setPin('1234')}}>sales / 1234</span>
            <span className="px-2 py-1 bg-slate-100 rounded cursor-pointer hover:bg-slate-200" onClick={() => {setUsername('finance'); setPin('1234')}}>finance / 1234</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

// --- View: Dashboard ---

const Dashboard = ({ leads = [], finances = [], onSimulasiClick, userRole }) => {
  const stats = [
    { label: "Total Leads", val: leads.length, icon: Users, color: "blue" },
    { label: "Omzet (Bulan Ini)", val: "55jt", icon: DollarSign, color: "green" },
    { label: "Conversion Rate", val: "12.5%", icon: TrendingUp, color: "orange" },
    { label: "Unit Terjual", val: "8/40", icon: Home, color: "purple" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Dashboard Overview</h1>
          <p className="text-slate-500">Ringkasan aktivitas hari ini.</p>
        </div>
        {userRole !== 'finance' && (
          <Button className="w-full md:w-auto" onClick={onSimulasiClick}>
            <Calculator size={18} /> Simulasi Cepat
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${COLOR_MAP[stat.color].bg} ${COLOR_MAP[stat.color].text}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
              <p className="text-xl font-bold">{stat.val}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {userRole !== 'finance' && (
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Calon Konsumen Terbaru</h3>
              <button className="text-blue-600 text-sm font-medium hover:underline">Lihat Semua</button>
            </div>
            <div className="space-y-4">
              {leads.slice(0, 3).map(lead => (
                <div key={lead.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shrink-0">
                      {lead.nama ? lead.nama.charAt(0) : "?"}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{lead.nama}</p>
                      <p className="text-xs text-slate-500 truncate">{lead.unit}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase whitespace-nowrap ${
                    lead.status === 'Hot' ? 'bg-red-100 text-red-600' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {lead.status}
                  </span>
                </div>
              ))}
              {leads.length === 0 && <p className="text-center text-slate-400 py-4">Belum ada data.</p>}
            </div>
          </Card>
        )}
        
        {(userRole === 'admin' || userRole === 'finance') && (
          <Card className={userRole === 'finance' ? 'lg:col-span-2' : ''}>
            <h3 className="font-bold mb-4">Laporan Keuangan Singkat</h3>
            <div className="space-y-4">
              {finances.slice(0, 5).map(f => (
                <div key={f.id} className="flex items-center justify-between border-b border-slate-50 dark:border-slate-700 pb-3 last:border-0">
                  <div className="min-w-0 pr-2">
                    <p className="text-sm font-medium truncate">{f.deskripsi}</p>
                    <p className="text-xs text-slate-500">{f.tanggal}</p>
                  </div>
                  <p className={`font-bold whitespace-nowrap ${f.tipe === 'Masuk' ? 'text-green-600' : 'text-red-500'}`}>
                    {f.tipe === 'Masuk' ? '+' : '-'} Rp{(f.jumlah/1000000).toFixed(1)}jt
                  </p>
                </div>
              ))}
              {finances.length === 0 && <p className="text-center text-slate-400 py-4">Belum ada transaksi.</p>}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

// --- View: User Management (Admin Only) ---

const UserManagementView = ({ users, onSaveUser, onDeleteUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEdit = (user) => {
    setEditData(user);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      id: editData ? editData.id : Date.now(),
      name: formData.get('name'),
      username: formData.get('username'),
      pin: formData.get('pin'),
      role: formData.get('role'),
    };
    onSaveUser(data);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Manajemen User (Admin)</h2>
        <Button onClick={handleAdd}><Plus size={18} /> Tambah User</Button>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr>
                <th className="px-6 py-4">Nama User</th>
                <th className="px-6 py-4">Username</th>
                <th className="px-6 py-4">Role / Divisi</th>
                <th className="px-6 py-4">PIN Akses</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 font-medium flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs">
                      {u.name.charAt(0)}
                    </div>
                    {u.name}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{u.username}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                      u.role === 'admin' ? 'bg-purple-100 text-purple-600' :
                      u.role === 'finance' ? 'bg-green-100 text-green-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-500">****</td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button onClick={() => handleEdit(u)} className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"><Edit2 size={16} /></button>
                    {u.username !== 'admin' && (
                      <button onClick={() => onDeleteUser(u.id)} className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"><Trash2 size={16} /></button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editData ? "Edit User" : "Tambah User Baru"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Nama Lengkap</label>
            <input name="name" defaultValue={editData?.name} required className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
             <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Username</label>
              <input name="username" defaultValue={editData?.username} required className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">PIN (4 Digit)</label>
              <input name="pin" type="text" maxLength={4} defaultValue={editData?.pin} required className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Role / Divisi</label>
            <select name="role" defaultValue={editData?.role || "marketing"} className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
              <option value="marketing">Marketing (Sales)</option>
              <option value="finance">Finance (Keuangan)</option>
              <option value="admin">Administrator (Full Access)</option>
            </select>
          </div>
          <Button type="submit" className="w-full py-3 mt-2">
            <Save size={18} /> Simpan Data User
          </Button>
        </form>
      </Modal>
    </div>
  );
};

// --- View: Leads ---

const LeadsView = ({ leads, onSaveLead, onDeleteLead }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEdit = (lead) => {
    setEditData(lead);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      id: editData ? editData.id : Date.now(),
      nama: formData.get('nama'),
      phone: formData.get('phone'),
      unit: formData.get('unit'),
      email: formData.get('email'),
      status: formData.get('status'),
    };
    onSaveLead(data);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Data Calon Konsumen</h2>
        <Button onClick={handleAdd}><Plus size={18} /> Tambah Lead</Button>
      </div>
      
      <Card className="overflow-hidden p-0">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari nama atau unit..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr>
                <th className="px-4 py-3 font-semibold">Nama</th>
                <th className="px-4 py-3 font-semibold hidden md:table-cell">Kontak</th>
                <th className="px-4 py-3 font-semibold">Unit Minat</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {leads.map(lead => (
                <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-4 font-medium">{lead.nama}</td>
                  <td className="px-4 py-4 hidden md:table-cell text-slate-500">{lead.phone}</td>
                  <td className="px-4 py-4 text-slate-600 dark:text-slate-300">{lead.unit}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                      lead.status === 'Hot' ? 'bg-orange-100 text-orange-600' : 
                      lead.status === 'Cold' ? 'bg-blue-100 text-blue-600' :
                      'bg-slate-200 text-slate-600'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 flex justify-center gap-2">
                    <button onClick={() => handleEdit(lead)} className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => onDeleteLead(lead.id)} className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {leads.length === 0 && <div className="p-8 text-center text-slate-400">Belum ada data lead.</div>}
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editData ? "Edit Konsumen" : "Tambah Konsumen Baru"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Nama Lengkap</label>
            <input name="nama" defaultValue={editData?.nama} required className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Nomor HP / WA</label>
            <input name="phone" defaultValue={editData?.phone} required className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
            <input name="email" type="email" defaultValue={editData?.email} className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Unit Diminati</label>
            <input name="unit" defaultValue={editData?.unit} className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Status Prospek</label>
            <select name="status" defaultValue={editData?.status || "Cold"} className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
              <option value="Cold">Cold (Baru Tanya)</option>
              <option value="Warm">Warm (Sudah Survey)</option>
              <option value="Hot">Hot (Siap Booking)</option>
            </select>
          </div>
          <Button type="submit" className="w-full py-3 mt-2">
            <Save size={18} /> Simpan Data
          </Button>
        </form>
      </Modal>
    </div>
  );
};

// --- View: Finance ---

const FinanceView = ({ finances, onSaveFinance, onDeleteFinance }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEdit = (item) => {
    setEditData(item);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      id: editData ? editData.id : Date.now(),
      deskripsi: formData.get('deskripsi'),
      tipe: formData.get('tipe'),
      jumlah: Number(formData.get('jumlah')),
      tanggal: formData.get('tanggal'),
    };
    onSaveFinance(data);
    setIsModalOpen(false);
  };

  // Hitung total secara dinamis
  const totalMasuk = finances.filter(f => f.tipe === 'Masuk').reduce((acc, curr) => acc + curr.jumlah, 0);
  const totalKeluar = finances.filter(f => f.tipe === 'Keluar').reduce((acc, curr) => acc + curr.jumlah, 0);
  const saldoBersih = totalMasuk - totalKeluar;

  const cardData = [
    { label: 'Pemasukan', val: totalMasuk, color: 'green' },
    { label: 'Pengeluaran', val: totalKeluar, color: 'red' },
    { label: 'Saldo Bersih', val: saldoBersih, color: 'blue' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Laporan Keuangan & Transaksi</h2>
        <div className="flex gap-2">
           <Button variant="secondary" className="hidden sm:flex">Ekspor PDF</Button>
           <Button onClick={handleAdd}><Plus size={18} /> <span className="hidden sm:inline">Transaksi Baru</span></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cardData.map((item, i) => (
          <Card key={i} className={`${COLOR_MAP[item.color].border} ${COLOR_MAP[item.color].light} dark:bg-opacity-10`}>
            <p className={`text-xs font-bold uppercase ${COLOR_MAP[item.color].text}`}>{item.label}</p>
            <p className={`text-2xl font-black ${COLOR_MAP[item.color].text.replace('600', '700')}`}>
              Rp{(item.val / 1000000).toFixed(1)}jt
            </p>
          </Card>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr>
                <th className="px-6 py-4">Keterangan</th>
                <th className="px-6 py-4">Tipe</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4 text-right">Jumlah</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {finances.map(f => (
                <tr key={f.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 font-medium max-w-[200px] truncate">{f.deskripsi}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                      f.tipe === 'Masuk' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {f.tipe}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{f.tanggal}</td>
                  <td className={`px-6 py-4 text-right font-bold whitespace-nowrap ${f.tipe === 'Masuk' ? 'text-green-600' : 'text-red-500'}`}>
                    Rp{f.jumlah.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button onClick={() => handleEdit(f)} className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => onDeleteFinance(f.id)} className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {finances.length === 0 && <div className="p-8 text-center text-slate-400">Belum ada transaksi.</div>}
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editData ? "Edit Transaksi" : "Catat Transaksi Baru"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Deskripsi Transaksi</label>
            <input name="deskripsi" defaultValue={editData?.deskripsi} required placeholder="Contoh: Booking Fee A1" className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
             <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Tipe</label>
              <select name="tipe" defaultValue={editData?.tipe || "Masuk"} className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Masuk">Pemasukan (+)</option>
                <option value="Keluar">Pengeluaran (-)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Tanggal</label>
              <input name="tanggal" type="date" defaultValue={editData?.tanggal || new Date().toISOString().split('T')[0]} required className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Jumlah (Rp)</label>
            <input name="jumlah" type="number" defaultValue={editData?.jumlah} required className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <Button type="submit" className="w-full py-3 mt-2">
            <Save size={18} /> Simpan Transaksi
          </Button>
        </form>
      </Modal>
    </div>
  );
};

// --- View: Simulasi ---

const SimulasiView = ({ params, setParams, onCalculate, result }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-600 text-white rounded-lg">
        <Activity size={24} />
      </div>
      <h2 className="text-xl font-bold">Simulasi AI KPR & DP</h2>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <Card className="lg:col-span-5 space-y-4">
        <h3 className="font-bold border-b pb-2">Parameter Keuangan</h3>
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase">Harga Properti (Rp)</label>
            <input 
              type="number" 
              value={params.hargaProperti}
              onChange={e => setParams({...params, hargaProperti: Number(e.target.value)})}
              className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Uang Muka (DP)</label>
              <input 
                type="number" 
                value={params.dp}
                onChange={e => setParams({...params, dp: Number(e.target.value)})}
                className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Tenor (Tahun)</label>
              <input 
                type="number" 
                value={params.tenor}
                onChange={e => setParams({...params, tenor: Number(e.target.value)})}
                className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase">Pendapatan Bersih / Bulan</label>
            <input 
              type="number" 
              value={params.pendapatan}
              onChange={e => setParams({...params, pendapatan: Number(e.target.value)})}
              className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <Button className="w-full py-4" onClick={onCalculate}>
             Mulai Analisa AI
          </Button>
        </div>
      </Card>

      <div className="lg:col-span-7">
        {!result ? (
          <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-10 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-200">
             <Activity size={48} className="text-slate-300 mb-4" />
             <p className="text-slate-500">Isi data dan tekan tombol Analisa untuk melihat hasil.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Card className={`border-l-8 ${
              result.status === 'Aman' ? 'border-l-green-500' : 
              result.status === 'Waspada' ? 'border-l-orange-500' : 'border-l-red-500'
            }`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">Analisa AI</h3>
                  <p className="text-sm text-slate-500">Probabilitas Approval</p>
                </div>
                <div className={`text-2xl font-black ${
                  result.status === 'Aman' ? 'text-green-600' : 
                  result.status === 'Waspada' ? 'text-orange-600' : 'text-red-600'
                }`}>
                  {result.score}%
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Cicilan/Bulan</p>
                  <p className="text-lg font-bold">Rp{Math.round(result.cicilanBulan).toLocaleString()}</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">DTI Ratio</p>
                  <p className="text-lg font-bold">{result.dti}%</p>
                </div>
              </div>

              <div className="flex gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100">
                <div className="mt-1">
                  {result.status === 'Aman' ? <CheckCircle className="text-green-600" /> : <AlertTriangle className="text-orange-600" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">Kesimpulan:</p>
                  <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">{result.message}</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  </div>
);

// --- Komponen Utama Aplikasi (App Shell) ---

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // State Users (Sekarang bisa diedit oleh Admin)
  const [users, setUsers] = useState([
    { id: 1, username: 'admin', pin: '1234', role: 'admin', name: 'Super Admin' },
    { id: 2, username: 'sales', pin: '1234', role: 'marketing', name: 'Budi Sales' },
    { id: 3, username: 'finance', pin: '1234', role: 'finance', name: 'Siti Keuangan' },
  ]);
  
  const [leads, setLeads] = useState([
    { id: 1, nama: "Budi Santoso", email: "budi@email.com", status: "Hot", unit: "Cluster Sakura A1", phone: "08123456789" },
    { id: 2, nama: "Siti Aminah", email: "siti@email.com", status: "Cold", unit: "Cluster Sakura B2", phone: "08123456780" },
    { id: 3, nama: "Andi Wijaya", email: "andi@email.com", status: "Warm", unit: "Modern Hill C5", phone: "08123456781" },
  ]);

  const [finances, setFinances] = useState([
    { id: 1, deskripsi: "Booking Fee Unit A1", tipe: "Masuk", jumlah: 10000000, tanggal: "2023-10-01" },
    { id: 2, deskripsi: "Biaya Marketing Ads", tipe: "Keluar", jumlah: 2500000, tanggal: "2023-10-02" },
    { id: 3, deskripsi: "Pelunasan DP Unit B2", tipe: "Masuk", jumlah: 45000000, tanggal: "2023-10-05" },
  ]);

  const [simParams, setSimParams] = useState({
    hargaProperti: 500000000,
    dp: 50000000,
    tenor: 15,
    bunga: 5,
    pendapatan: 15000000,
    cicilanLain: 0
  });

  const [aiAnalysis, setAiAnalysis] = useState(null);

  // --- Fungsi Logika ---

  // User Management Logic
  const handleSaveUser = (newUser) => {
    const exists = users.find(u => u.id === newUser.id);
    if (exists) {
      setUsers(users.map(u => u.id === newUser.id ? newUser : u));
    } else {
      setUsers([...users, newUser]);
    }
  };

  const handleDeleteUser = (id) => {
    if (confirm("Hapus user ini?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSaveLead = (newLead) => {
    const exists = leads.find(l => l.id === newLead.id);
    if (exists) {
      setLeads(leads.map(l => l.id === newLead.id ? newLead : l));
    } else {
      setLeads([...leads, newLead]);
    }
  };

  const handleDeleteLead = (id) => {
    if (confirm("Hapus data konsumen ini?")) {
      setLeads(leads.filter(l => l.id !== id));
    }
  };

  const handleSaveFinance = (newFin) => {
    const exists = finances.find(f => f.id === newFin.id);
    if (exists) {
      setFinances(finances.map(f => f.id === newFin.id ? newFin : f));
    } else {
      setFinances([...finances, newFin]);
    }
  };

  const handleDeleteFinance = (id) => {
    if (confirm("Hapus transaksi ini?")) {
       setFinances(finances.filter(f => f.id !== id));
    }
  };

  const handleLogin = (username, pin, onError) => {
    // Mencari user di state 'users' yang dinamis
    const foundUser = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.pin === pin);

    if (foundUser) {
      setUser(foundUser);
      setActiveTab('dashboard'); 
    } else {
      onError('Username atau PIN salah. (Coba: admin / 1234)');
    }
  };

  const hitungSimulasi = () => {
    const p = simParams.hargaProperti - simParams.dp;
    const r = (simParams.bunga / 100) / 12;
    const n = simParams.tenor * 12;
    
    const cicilanBulan = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const dti = (cicilanBulan / simParams.pendapatan) * 100;

    let status = "Aman";
    let score = 95;
    let message = "Profil sangat layak. Probabilitas KPR disetujui sangat tinggi.";

    if (dti > 40) {
      status = "Beresiko";
      score = 30;
      message = "Cicilan melebihi 40% pendapatan. Disarankan memperbesar DP.";
    } else if (dti > 30) {
      status = "Waspada";
      score = 65;
      message = "Cukup aman, namun bank mungkin akan meminta dokumen tambahan.";
    }

    setAiAnalysis({ cicilanBulan, dti: dti.toFixed(1), status, score, message });
  };

  const getMenuItems = () => {
    const allItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home, roles: ['admin', 'marketing', 'finance'] },
      { id: 'leads', label: 'Konsumen', icon: Users, roles: ['admin', 'marketing'] },
      { id: 'simulasi', label: 'Simulasi AI', icon: Calculator, roles: ['admin', 'marketing'] },
      { id: 'finance', label: 'Keuangan', icon: PieChart, roles: ['admin', 'finance'] },
      { id: 'users', label: 'Manajemen User', icon: Shield, roles: ['admin'] }, // Menu baru
    ];
    
    if (!user) return [];
    return allItems.filter(item => item.roles.includes(user.role));
  };

  if (!user) {
    return <LoginView onLogin={handleLogin} />;
  }

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row font-sans overflow-hidden">
      
      {/* Sidebar Laptop (Fixed) */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-800 border-r border-slate-100 dark:border-slate-700 h-screen sticky top-0 p-6 z-40">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-200">
            <Home size={20} />
          </div>
          <span className="text-lg font-black tracking-tight">PropCRM <span className="text-blue-600">AI</span></span>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                activeTab === item.id 
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' 
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto border-t border-slate-100 dark:border-slate-700 pt-4">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs uppercase">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
               <p className="text-sm font-bold truncate">{user.name}</p>
               <p className="text-[10px] text-slate-500 uppercase">{user.role}</p>
            </div>
          </div>
          <Button variant="secondary" onClick={() => setUser(null)} className="w-full text-xs">
            <LogOut size={14} /> Keluar
          </Button>
        </div>
      </aside>

      {/* Main Content Area (Scrollable) */}
      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto h-screen">
        <header className="md:hidden flex items-center justify-between mb-6 sticky top-0 bg-slate-50 dark:bg-slate-900 z-30 py-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Home size={18} />
            </div>
            <span className="font-bold">PropCRM AI</span>
          </div>
          <button onClick={() => setUser(null)} className="p-2 bg-slate-100 rounded-full text-slate-500">
            <LogOut size={18} />
          </button>
        </header>

        <div className="max-w-6xl mx-auto">
          {activeTab === 'dashboard' && (
            <Dashboard 
              leads={leads} 
              finances={finances} 
              onSimulasiClick={() => setActiveTab('simulasi')} 
              userRole={user.role}
            />
          )}
          
          {activeTab === 'leads' && (
            <LeadsView 
              leads={leads} 
              onSaveLead={handleSaveLead} 
              onDeleteLead={handleDeleteLead}
            />
          )}

          {activeTab === 'simulasi' && (
            <SimulasiView 
              params={simParams} 
              setParams={setSimParams} 
              onCalculate={hitungSimulasi} 
              result={aiAnalysis} 
            />
          )}

          {activeTab === 'finance' && (
            <FinanceView 
              finances={finances}
              onSaveFinance={handleSaveFinance}
              onDeleteFinance={handleDeleteFinance}
            />
          )}

          {activeTab === 'users' && (
            <UserManagementView
              users={users}
              onSaveUser={handleSaveUser}
              onDeleteUser={handleDeleteUser}
            />
          )}
        </div>
      </main>

      {/* Mobile Nav (Fixed Bottom) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 px-6 py-3 flex justify-between items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === item.id ? 'text-blue-600 scale-105' : 'text-slate-400'
            }`}
          >
            <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        ))}
      </nav>

    </div>
  );
}