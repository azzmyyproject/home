document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. DATA LAYANAN & PROYEK
    // ==========================================
    const servicesData = {
        "01": {
            title: "IoT Solutions",
            icon: "fa-wifi",
            desc: "Connecting the physical world to the digital realm with smart solutions for enhanced connectivity. Kami merancang arsitektur end-to-end mulai dari sensor, mikrokomputer, hingga pengiriman data aman melalui protokol IoT.",
            specs: ["Sensor Integration (Temperature, Gas, Proximity)", "Protokol MQTT, HTTP RestAPI, WebSocket", "ESP32 & STM32 Architecture", "Battery Management System & Low Power Node"]
        },
        "02": {
            title: "Control Automation",
            icon: "fa-sliders",
            desc: "Streamline processes and elevate operations with smart, automated industrial solutions. Otomatisasi sistem mekanikal dan elektrikal guna meningkatkan efisiensi industri produksi dan rumahan.",
            specs: ["Relay & Actuator Control", "Modbus RS485 / Industrial Protocol RTU", "PLC Interfacing & Calibration", "Pneumatic & Motor Driver Driver Speed Control"]
        },
        "03": {
            title: "PCB Design & Assembly",
            icon: "fa-microchip",
            desc: "Transform your electronic concepts into reality with expert design and assembly services. Pembuatan skematik sirkuit elektronik hingga layouting PCB multi-layer yang siap diproduksi massal.",
            specs: ["Schematic Capture & PCB Layout (Eagle, KiCad)", "High-Speed Signal Routing & Noise Reduction", "BOM (Bill of Materials) Optimization", "SMD & DIP Component SMT Assembly"]
        },
        "04": {
            title: "Web Application",
            icon: "fa-globe",
            desc: "Custom platforms dedicated to monitoring and controlling connected devices with ease. Pembuatan dashboard monitoring real-time berbasis web yang ringan, responsif, dan mudah dipahami.",
            specs: ["Real-time Telemetry Widgets", "NodeJS / Python Backend Server", "Responsive Frontend Dashboard (Tailwind CSS)", "Database Time-series Integration"]
        }
    };

    const projectsData = {
        "p1": {
            title: "GoLite IoT Platform",
            tag: "IoT Ecosystem",
            icon: "fa-cubes",
            desc: "Ekosistem IoT All-in-one dengan fitur AI Analysis, Face Recognition, dan manajemen perangkat skala industri. Platform ini dirancang untuk mempermudah developer memonitor ribuan sensor sekaligus.",
            specs: ["Arsitektur Microservices", "Real-time AI Face Recognition AI Inference", "Skalabilitas Data Time-series", "Multi-tenant Device Management"]
        },
        "p2": {
            title: "IoT Kita | MQTT Control Center",
            tag: "MQTT Broker & Dashboard",
            icon: "fa-chart-line",
            desc: "Dashboard MQTT Profesional dengan Real-time Telemetry, Analisis Data Time-series, dan Sistem Widget Modular yang dapat disesuaikan kebutuhan client.",
            specs: ["Protokol WebSockets & MQTT via TLS", "Penyimpanan Data InfluxDB", "Widget Seret & Lepas (Drag & Drop)", "Sistem Alergi & Notifikasi Telegram Telegram"]
        },
        "p3": {
            title: "IoT Vending Machine",
            tag: "Smart Hardware",
            icon: "fa-cash-register",
            desc: "Sistem vending machine pintar dengan integrasi pembayaran otomatis menggunakan QRIS (Gopay, OVO, Dana) serta manajemen stok produk berbasis cloud logistik.",
            specs: ["Integrasi API Payment Gateway QRIS", "Mekanisme Motor Stepper Dispenser", "Konektivitas Fail-safe GSM / WiFi", "Dashboard Monitoring Stok Real-time"]
        },
        "p4": {
            title: "Industrial Power Monitoring",
            tag: "Automation & Electrical",
            icon: "fa-bolt",
            desc: "Sistem pelacakan konsumsi energi listrik 3-Phase menggunakan Industrial Modbus Meter. Mampu memprediksi lonjakan beban dan efisiensi mesin pabrik.",
            specs: ["Protokol Komunikasi Modbus RTU RS485", "Kalkulasi Faktor Daya (Power Factor)", "Ekspor Laporan Otomatis (CSV/PDF)", "Pemasangan Rail DIN Standar Industri"]
        },
        "p5": {
            title: "Smart Robot AI & Telemetry",
            tag: "Robotics",
            icon: "fa-robot",
            desc: "Robot penjelajah otonom yang dibekali dengan kecerdasan buatan (Computer Vision) untuk melacak objek, dikendalikan via remote jarak jauh dengan latensi sangat rendah.",
            specs: ["Pengolahan Citra OpenCV / Jetson Nano", "Komunikasi Data WebSocket (<50ms Latency)", "Sistem Navasigasi SLAM & LiDAR", "Telemetri Baterai & Arus Motor Aktif"]
        },
        "p6": {
            title: "Integrated Smart School System",
            tag: "Enterprise System",
            icon: "fa-graduation-cap",
            desc: "Ekosistem Sekolah Pintar komprehensif: Absensi berbasis Multi-faktor (Wajah & RFID), sistem kantin non-tunai (Cashless), serta sistem otomatisasi lampu/AC gedung.",
            specs: ["Gateway RFID UHF Jarak Jauh", "Sistem Saldo Terenkripsi E-Wallet", "Relay Kontrol Jadwal AC Otomatis", "Aplikasi Mobile Portal Wali Murid"]
        }
    };

    // ==========================================
    // 2. LOGIKA OPERASI MODAL POP-UP
    // ==========================================
    const modal = document.getElementById("serviceModal");
    const modalContent = document.getElementById("modalContent");
    const closeBtns = document.querySelectorAll("#closeModalBtn, #closeModalBottomBtn");
    
    const modalIcon = document.getElementById("modalIcon");
    const modalNumber = document.getElementById("modalNumber");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalSpecs = document.getElementById("modalSpecs");

    // Buka Modal untuk Service (01 - 04)
    const serviceCards = document.querySelectorAll(".service-card");
    serviceCards.forEach(card => {
        card.addEventListener("click", () => {
            const numText = card.querySelector("span").textContent.trim();
            const id = numText.substring(0, 2);
            const data = servicesData[id];
            if (!data) return;

            openModal(`${id}. Service Detail`, data.title, data.desc, data.icon, data.specs);
        });
    });

    // Buka Modal untuk Projects di Recent Works
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach(card => {
        card.addEventListener("click", () => {
            const projectId = card.getAttribute("data-project-id");
            const data = projectsData[projectId];
            if (!data) return;

            openModal(data.tag, data.title, data.desc, data.icon, data.specs);
        });
    });

    // Fungsi Utama Menyuntik Data & Membuka Modal
    function openModal(tag, title, desc, icon, specs) {
        modalNumber.textContent = tag;
        modalTitle.textContent = title;
        modalDescription.textContent = desc;
        modalIcon.innerHTML = `<i class="fa-solid ${icon}"></i>`;
        
        modalSpecs.innerHTML = "";
        specs.forEach(spec => {
            const li = document.createElement("li");
            li.textContent = spec;
            modalSpecs.appendChild(li);
        });

        modal.classList.remove("opacity-0", "pointer-events-none");
        modalContent.classList.remove("scale-95");
        modalContent.classList.add("scale-100");
    }

    // Fungsi Tutup Modal
    const closeModal = () => {
        modal.classList.add("opacity-0", "pointer-events-none");
        modalContent.classList.remove("scale-100");
        modalContent.classList.add("scale-95");
    };

    closeBtns.forEach(btn => btn.addEventListener("click", closeModal));
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

    // ==========================================
    // 3. FITUR SEBELUMNYA (FILTER & SCROLL TOP)
    // ==========================================
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => {
                btn.classList.remove("active", "bg-green-600/20", "text-green-400", "border-green-500/30");
                btn.classList.add("bg-gray-800", "text-gray-400", "border-transparent");
            });
            button.classList.add("active", "bg-green-600/20", "text-green-400", "border-green-500/30");
            button.classList.remove("bg-gray-800", "text-gray-400", "border-transparent");
            
            const filterValue = button.getAttribute("data-filter");
            projectCards.forEach(card => {
                if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    const scrollTopBtn = document.getElementById("scrollTopBtn");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.remove("opacity-0", "translate-y-10", "invisible");
            scrollTopBtn.classList.add("opacity-100", "translate-y-0", "visible");
        } else {
            scrollTopBtn.classList.add("opacity-0", "translate-y-10", "invisible");
            scrollTopBtn.classList.remove("opacity-100", "translate-y-0", "visible");
        }
    });
    scrollTopBtn.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: "smooth" }); });
});
// Membuat elemen <style> baru di dalam memori
const style = document.createElement('style');

// Memasukan keyframes dan class animasi RGB kustom 
style.innerHTML = `
    @keyframes rgbShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    .animate-rgb {
        background-size: 200% auto !important;
        animation: rgb-flow 4s linear infinite !important;
    }
`;

// Menyisipkan elemen <style> ke dalam <head> dokumen
document.head.appendChild(style);
