/**
 * VIRON TECH - Integrated Systems & Low Voltage
 * High-End Custom JavaScript (Dynamic Animations & Logic Flow)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }

    // Close menu when link is clicked
    const navLinks = document.querySelectorAll('.nav-item a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                menuToggle.querySelector('i').className = 'fas fa-bars';
            }
        });
    });

    // 3. Theme Toggle (Dark / Light Mode)
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        // Check localStorage or system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.body.classList.add('dark-mode');
            themeToggleBtn.querySelector('i').className = 'fas fa-sun';
        } else {
            document.body.classList.remove('dark-mode');
            themeToggleBtn.querySelector('i').className = 'fas fa-moon';
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const icon = themeToggleBtn.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                icon.className = 'fas fa-sun';
            } else {
                localStorage.setItem('theme', 'light');
                icon.className = 'fas fa-moon';
            }
        });
    }

    // 4. Compare Tabs Interaction
    const tabButtons = document.querySelectorAll('.compare-tab-btn');
    const comparePanels = document.querySelectorAll('.compare-panel');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            comparePanels.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // 5. Dynamic Low-Voltage Service Request Wizard (Interactive Multi-step Form)
    let currentStep = 1;
    const totalSteps = 3;
    const wizardPanels = document.querySelectorAll('.wizard-panel');
    const indicators = document.querySelectorAll('.step-indicator');
    const progressBar = document.querySelector('.wizard-step-progress');
    
    const prevBtn = document.getElementById('wizardPrevBtn');
    const nextBtn = document.getElementById('wizardNextBtn');

    // System select checkboxes card toggles
    const selectCards = document.querySelectorAll('.system-select-card');
    selectCards.forEach(card => {
        card.addEventListener('click', () => {
            const checkbox = card.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
            card.classList.toggle('selected', checkbox.checked);
            updateDynamicWizardFields();
        });
    });

    function updateDynamicWizardFields() {
        const cctvChecked = document.getElementById('sys-cctv').checked;
        const netChecked = document.getElementById('sys-networking').checked;
        const soundChecked = document.getElementById('sys-sound').checked;
        const accessChecked = document.getElementById('sys-access').checked;
        const alarmChecked = document.getElementById('sys-alarm').checked;
        const ledChecked = document.getElementById('sys-led').checked;

        // Dynamic fields wrapper
        const dynamicFields = document.getElementById('dynamicWizardFields');
        if (!dynamicFields) return;
        dynamicFields.innerHTML = '';

        if (cctvChecked) {
            dynamicFields.innerHTML += `
                <div class="compare-side" style="margin-bottom: 20px;">
                    <h4 style="color: var(--accent); margin-bottom: 15px;"><i class="fas fa-video"></i> تفاصيل كاميرات المراقبة المخصصة:</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div class="form-group" style="grid-column: span 2;">
                            <label>نوع نظام الكاميرات المطلوب (يمكن اختيار أكثر من نوع):</label>
                            <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 8px;">
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" id="form-cctv-type-ip" value="أنظمة شبكية ذكية (IP AI)" checked style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>أنظمة شبكية ذكية (IP AI Network)</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" id="form-cctv-type-analog" value="أنظمة تماثلية (HD Analog)" style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>أنظمة تماثلية عالية الدقة (HD Analog)</span>
                                </label>
                            </div>
                        </div>
                        <div class="form-group" style="grid-column: span 2; margin-top: 5px;">
                            <label>الشركة المصنعة أو الماركة المفضلة للكاميرات (يمكن اختيار أكثر من ماركة):</label>
                            <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 8px;">
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" class="form-cctv-brand-cb" value="Dahua (دهوا)" checked style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>Dahua (دهوا)</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" class="form-cctv-brand-cb" value="Hikvision (هايك فيجين)" style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>Hikvision (هايك فيجين)</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" class="form-cctv-brand-cb" value="Tiandy (تياندي)" style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>Tiandy (تياندي)</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" class="form-cctv-brand-cb" value="Uniview (يوني فيو)" style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>Uniview (يوني فيو)</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" class="form-cctv-brand-cb" value="مزيج هجين (Hybrid)" style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>مزيج هجين (Hybrid)</span>
                                </label>
                            </div>
                        </div>
                        <div class="form-group" style="grid-column: span 2;">
                            <label for="form-cctv-count">العدد التقريبي للكاميرات المطلوبة:</label>
                            <input type="number" class="form-control" id="form-cctv-count" min="1" value="4" style="width: 100%;">
                        </div>
                    </div>
                </div>
            `;
        }

        if (netChecked) {
            dynamicFields.innerHTML += `
                <div class="compare-side" style="margin-bottom: 20px;">
                    <h4 style="color: var(--accent); margin-bottom: 15px;"><i class="fas fa-network-wired"></i> تفاصيل الشبكة والربط المطلوبة:</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div class="form-group" style="grid-column: span 2;">
                            <label>الأجهزة والماركات المطلوبة (يمكن اختيار أكثر من ماركة):</label>
                            <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 8px;">
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" class="form-net-brand-cb" value="Fortinet Firewall" checked style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>جدران حماية فورتي نت (Fortinet)</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" class="form-net-brand-cb" value="Aruba & Cisco Enterprise" style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>أجهزة سيسكو وأروبا (Cisco / Aruba)</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" class="form-net-brand-cb" value="TP-Link Enterprise" checked style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>حلول تي بي لينك (TP-Link Enterprise)</span>
                                </label>
                            </div>
                        </div>
                        <div class="form-group" style="grid-column: span 2;">
                            <label for="form-net-scope">المساحة أو النطاق المراد تغطيته بالواي فاي:</label>
                            <select class="form-control" id="form-net-scope" style="width: 100%;">
                                <option value="شقة سكنية أو مكتب صغير">شقة سكنية أو مكتب صغير</option>
                                <option value="فيلا / منزل متعدد الطوابق">فيلا / منزل متعدد الطوابق</option>
                                <option value="مجمع تجاري / شركة متوسطة">مجمع تجاري / شركة متوسطة</option>
                                <option value="موقع خارجي مفتوح (ربط لاسلكي P2P)">موقع خارجي مفتوح (ربط لاسلكي P2P)</option>
                            </select>
                        </div>
                    </div>
                </div>
            `;
        }

        if (soundChecked) {
            dynamicFields.innerHTML += `
                <div class="compare-side" style="margin-bottom: 20px;">
                    <h4 style="color: var(--accent); margin-bottom: 15px;"><i class="fas fa-volume-up"></i> تفاصيل نظام الصوت والنداء المطلوبة:</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div class="form-group" style="grid-column: span 2;">
                            <label>الخدمات الصوتية المطلوبة (يمكن اختيار أكثر من خدمة):</label>
                            <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 8px;">
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" class="form-sound-service-cb" value="نداء مناطق موزعة (Zonal Paging)" checked style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>نداء مناطق موزعة (Zonal Paging)</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" class="form-sound-service-cb" value="موسيقى خلفية (Background Music)" style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>موسيقى خلفية (Background Music)</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" class="form-sound-service-cb" value="تكامل مع نظام الحريق والبدالة" style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>تكامل مع نظام الحريق والبدالة</span>
                                </label>
                            </div>
                        </div>
                        <div class="form-group" style="grid-column: span 2;">
                            <label>بيئة التركيب ونوع السماعات المطلوبة (يمكن اختيار أكثر من نوع):</label>
                            <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 8px;">
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" class="form-sound-speaker-cb" value="سماعات سقفية داخلية للجبس" checked style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>سماعات سقفية داخلية (للجبس)</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" class="form-sound-speaker-cb" value="سماعات جدارية معلقة" style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>سماعات جدارية معلقة</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" class="form-sound-speaker-cb" value="سماعات حدائق خارجية مقاومة للرطوبة" style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>سماعات حدائق خارجية مقاومة للماء</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        if (accessChecked) {
            dynamicFields.innerHTML += `
                <div class="compare-side" style="margin-bottom: 20px;">
                    <h4 style="color: var(--accent); margin-bottom: 15px;"><i class="fas fa-fingerprint"></i> تفاصيل نظام الأكسس كونترول والحضور:</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div class="form-group" style="grid-column: span 2;">
                            <label>نوع نظام التحكم بالوصول والميزات المطلوبة (يمكن اختيار أكثر من صنف):</label>
                            <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 8px;">
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" class="form-access-type-cb" value="قفل وفتح الأبواب إلكترونياً (Door Access)" checked style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>قفل وفتح الأبواب إلكترونياً</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" class="form-access-type-cb" value="تسجيل حضور وانصراف الموظفين" style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>تسجيل حضور وانصراف الموظفين (Time & Attendance)</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" class="form-access-type-cb" value="أجهزة التعرف على الوجه وبصمة الكف" checked style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>التعرف على الوجه وبصمة الكف (ZKTeco)</span>
                                </label>
                            </div>
                        </div>
                        <div class="form-group" style="grid-column: span 2;">
                            <label for="form-access-count">عدد الأبواب أو نقاط البصمة المطلوبة:</label>
                            <input type="number" class="form-control" id="form-access-count" min="1" value="2" style="width: 100%;">
                        </div>
                    </div>
                </div>
            `;
        }

        if (alarmChecked) {
            dynamicFields.innerHTML += `
                <div class="compare-side" style="margin-bottom: 20px;">
                    <h4 style="color: var(--accent); margin-bottom: 15px;"><i class="fas fa-fire-extinguisher"></i> تفاصيل نظام الإنذار والسلامة المطلوب:</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div class="form-group" style="grid-column: span 2;">
                            <label>نوع نظام الإنذار المطلوب (يمكن اختيار أكثر من نوع):</label>
                            <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 8px;">
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" class="form-alarm-type-cb" value="إنذار حريق معنون ذكي (Addressable Hochiki)" checked style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>إنذار حريق معنون ذكي (Hochiki الياباني)</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" class="form-alarm-type-cb" value="إنذار حريق تقليدي (Conventional)" style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>إنذار حريق تقليدي (Conventional)</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" class="form-alarm-type-cb" value="إنذار ضد السرقة والاقتحام اللاسلكي" style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>إنذار ضد السرقة والاقتحام اللاسلكي</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        if (ledChecked) {
            dynamicFields.innerHTML += `
                <div class="compare-side" style="margin-bottom: 20px;">
                    <h4 style="color: var(--accent); margin-bottom: 15px;"><i class="fas fa-desktop"></i> تفاصيل شاشات العرض والمديول المطلوبة:</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div class="form-group" style="grid-column: span 2;">
                            <label>نوع شاشة العرض المطلوبة (يمكن اختيار أكثر من صنف):</label>
                            <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 8px;">
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" class="form-led-type-cb" value="شاشات مديول LED داخلية (Indoor)" checked style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>شاشات مديول LED داخلية (Indoor)</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" class="form-led-type-cb" value="شاشات مديول LED خارجية (Outdoor)" style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>شاشات مديول LED خارجية (Outdoor)</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main); font-weight: 500;">
                                    <input type="checkbox" class="form-led-type-cb" value="جدار فيديو متكامل لغرفة المراقبة (Video Wall)" style="width: 18px; height: 18px; accent-color: var(--accent);">
                                    <span>جدار فيديو لغرفة المراقبة (Video Wall)</span>
                                </label>
                            </div>
                        </div>
                        <div class="form-group" style="grid-column: span 2;">
                            <label for="form-led-size">الأبعاد التقريبية للشاشة المطلوبة (عرض × ارتفاع بالمتر):</label>
                            <input type="text" class="form-control" id="form-led-size" placeholder="مثال: 3 × 2 متر" value="3 × 2 متر" style="width: 100%;">
                        </div>
                    </div>
                </div>
            `;
        }

        // General default if nothing is selected or for other systems
        if (dynamicFields.innerHTML === '') {
            dynamicFields.innerHTML = `
                <p style="text-align: center; color: var(--text-muted); padding: 20px;">يرجى اختيار نظام واحد على الأقل في الخطوة الأولى لتفصيل إعداداتك التقنية المخصصة.</p>
            `;
        }
    }

    function updateWizardUI() {
        // Toggle Panels
        wizardPanels.forEach(panel => panel.classList.remove('active'));
        document.getElementById(`stepPanel-${currentStep}`).classList.add('active');

        // Toggle Indicators
        indicators.forEach((indicator, index) => {
            const stepNum = index + 1;
            indicator.classList.remove('active', 'completed');
            if (stepNum === currentStep) {
                indicator.classList.add('active');
            } else if (stepNum < currentStep) {
                indicator.classList.add('completed');
                indicator.innerHTML = '<i class="fas fa-check"></i>';
            } else {
                indicator.innerHTML = stepNum;
            }
        });

        // Update Progress Bar
        const progressWidth = ((currentStep - 1) / (totalSteps - 1)) * 100;
        progressBar.style.width = `${progressWidth}%`;

        // Update Nav Buttons
        if (currentStep === 1) {
            prevBtn.style.visibility = 'hidden';
            nextBtn.innerHTML = 'التالي <i class="fas fa-arrow-left" style="margin-left: 5px;"></i>';
        } else if (currentStep === totalSteps) {
            prevBtn.style.visibility = 'visible';
            nextBtn.innerHTML = 'إرسال الطلبية للواتساب <i class="fab fa-whatsapp" style="margin-right: 5px; font-size:1.1rem;"></i>';
        } else {
            prevBtn.style.visibility = 'visible';
            nextBtn.innerHTML = 'التالي <i class="fas fa-arrow-left" style="margin-right: 5px;"></i>';
        }
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentStep < totalSteps) {
                // Validate Step 1: Must select at least one system from the main cards
                if (currentStep === 1) {
                    const checkedSystems = document.querySelectorAll('.system-select-card input[type="checkbox"]:checked');
                    if (checkedSystems.length === 0) {
                        alert('يرجى اختيار نظام تكنولوجي واحد على الأقل للمتابعة.');
                        return;
                    }
                }
                
                // Validate Step 2: Ensure dynamic fields are parsed
                currentStep++;
                updateWizardUI();
            } else {
                // Submit Form: Validate step 3 inputs
                const clientName = document.getElementById('client-name').value.trim();
                const clientPhone = document.getElementById('client-phone').value.trim();
                const clientCity = document.getElementById('client-city').value;

                if (!clientName || !clientPhone) {
                    alert('يرجى تعبئة الاسم الكامل ورقم الجوال لتسجيل طلبيتك.');
                    return;
                }

                // Process WhatsApp submission
                submitOrderToWhatsApp(clientName, clientPhone, clientCity);
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateWizardUI();
            }
        });

        // Initialize dynamic fields
        updateDynamicWizardFields();
        updateWizardUI();
    }

    function submitOrderToWhatsApp(name, phone, city) {
        const checkedSystems = [];
        document.querySelectorAll('.system-select-card input[type="checkbox"]:checked').forEach(cb => {
            checkedSystems.push(cb.getAttribute('value'));
        });

        let technicalDetails = '';
        
        // Cameras
        if (document.getElementById('sys-cctv').checked) {
            const types = [];
            if (document.getElementById('form-cctv-type-ip')?.checked) types.push("أنظمة شبكية ذكية (IP AI)");
            if (document.getElementById('form-cctv-type-analog')?.checked) types.push("أنظمة تماثلية (HD Analog)");
            
            const brands = [];
            document.querySelectorAll('.form-cctv-brand-cb:checked').forEach(cb => {
                brands.push(cb.value);
            });
            
            const cctvCount = document.getElementById('form-cctv-count')?.value || '4';
            technicalDetails += `\n*كاميرات المراقبة*: [الأنواع: ${types.join(' + ') || 'غير محدد'}] [الماركات: ${brands.join(' + ') || 'غير محدد'}] [العدد: ${cctvCount} كاميرات]`;
        }

        // Networks
        if (document.getElementById('sys-networking').checked) {
            const brands = [];
            document.querySelectorAll('.form-net-brand-cb:checked').forEach(cb => {
                brands.push(cb.value);
            });
            const netScope = document.getElementById('form-net-scope')?.value || '';
            technicalDetails += `\n*الشبكة والربط*: [الأجهزة: ${brands.join(' + ') || 'غير محدد'}] [نطاق التغطية: ${netScope}]`;
        }

        // Sound System
        if (document.getElementById('sys-sound').checked) {
            const services = [];
            document.querySelectorAll('.form-sound-service-cb:checked').forEach(cb => {
                services.push(cb.value);
            });
            const speakers = [];
            document.querySelectorAll('.form-sound-speaker-cb:checked').forEach(cb => {
                speakers.push(cb.value);
            });
            technicalDetails += `\n*أنظمة الصوت والنداء*: [الخدمات: ${services.join(' + ') || 'غير محدد'}] [سماعات وبيئة التركيب: ${speakers.join(' + ') || 'غير محدد'}]`;
        }

        // Access Control
        if (document.getElementById('sys-access').checked) {
            const features = [];
            document.querySelectorAll('.form-access-type-cb:checked').forEach(cb => {
                features.push(cb.value);
            });
            const accessCount = document.getElementById('form-access-count')?.value || '2';
            technicalDetails += `\n*الأكسس والحضور*: [الميزات: ${features.join(' + ') || 'غير محدد'}] [عدد النقاط/الأبواب: ${accessCount}]`;
        }

        // Alarms
        if (document.getElementById('sys-alarm').checked) {
            const alarmTypes = [];
            document.querySelectorAll('.form-alarm-type-cb:checked').forEach(cb => {
                alarmTypes.push(cb.value);
            });
            technicalDetails += `\n*أنظمة الإنذار والسلامة*: [الأنواع: ${alarmTypes.join(' + ') || 'غير محدد'}]`;
        }

        // LED Screens
        if (document.getElementById('sys-led').checked) {
            const ledTypes = [];
            document.querySelectorAll('.form-led-type-cb:checked').forEach(cb => {
                ledTypes.push(cb.value);
            });
            const ledSize = document.getElementById('form-led-size')?.value || '';
            technicalDetails += `\n*شاشات مديول LED*: [الأنواع: ${ledTypes.join(' + ') || 'غير محدد'}] [الأبعاد المطلوبة: ${ledSize}]`;
        }

        // General note
        const note = document.getElementById('client-notes').value.trim();
        const noteStr = note ? `\n*ملاحظات العميل*: ${note}` : '';

        // Formulating the perfect whatsapp message
        const whatsappMsg = `السلام عليكم مهندس إبراهيم، أود طلب معاينة وتصميم أنظمة جهد منخفض لمشروعي عبر موقع *VIRON TECH* للأنظمة المتكاملة.

*تفاصيل طلبيتي الحصرية*:
* الأنظمة المطلوبة: ${checkedSystems.join('، ')} ${technicalDetails}
${noteStr}

*بيانات العميل*:
* الاسم: ${name}
* الجوال: ${phone}
* المدينة/المنطقة: ${city}

يرجى التواصل معي لتحديد موعد الزيارة والمعاينة الهندسية المجانية للموقع للتسعير الدقيق.
شكرًا لك.`;

        const encodedMsg = encodeURIComponent(whatsappMsg);
        const whatsappUrl = `https://wa.me/972593417639?text=${encodedMsg}`;

        // Create a beautiful success message in the panel
        const wizardCard = document.querySelector('.wizard-card');
        wizardCard.innerHTML = `
            <div class="wizard-success">
                <i class="fas fa-check-circle"></i>
                <h3 style="font-size:1.8rem; margin-bottom:15px; color: var(--text-main);">تم تجهيز طلبيتك بنجاح يا ${name}!</h3>
                <p style="color: var(--text-muted); max-width:600px; margin: 0 auto 30px auto; font-size:1.05rem;">
                    تم صياغة تفاصيل مشروعك بشكل هندسي دقيق ومحترف. سيتم فتح الواتساب الآن مباشرة لإرسال الطلبية إلى المهندس إبراهيم وتحديد موعد المعاينة المجانية.
                </p>
                <a href="${whatsappUrl}" target="_blank" class="btn-primary" style="padding: 15px 40px; font-size:1.1rem; border-radius:15px;">
                    إرسال الآن عبر واتساب فوري <i class="fab fa-whatsapp" style="font-size:1.3rem;"></i>
                </a>
                <div style="margin-top: 25px;">
                    <button onclick="window.location.reload();" class="btn-secondary" style="font-size:0.85rem; padding: 8px 20px;">
                        إنشاء طلب جديد <i class="fas fa-redo"></i>
                    </button>
                </div>
            </div>
        `;

        // Direct redirection to whatsapp
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 1200);
    }

    // 6. Dynamic RSS Tech News Aggregator & Palestine/Global Security articles
    // 6. Dynamic RSS Tech News Aggregator & Palestine/Global Security articles
    async function fetchLiveNews() {
        const newsContainer = document.getElementById('liveNewsFeedContainer');
        if (!newsContainer) return;

        newsContainer.innerHTML = `
            <div style="grid-column: span 2; text-align:center; padding:40px; color: var(--text-muted);">
                <i class="fas fa-spinner fa-spin" style="font-size:2rem; color: var(--accent); margin-bottom:15px;"></i>
                <p>جاري سحب آخر الأخبار التقنية والأمنية مباشرة...</p>
            </div>
        `;

        // Helper for dynamic dates relative to today
        const getRelativeDateArabic = (daysAgo) => {
            const date = new Date();
            date.setDate(date.getDate() - daysAgo);
            return date.toLocaleDateString('ar-EG', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        };

        const fallbackArticles = [
            {
                title: "تكامل الذكاء الاصطناعي في كاميرات المراقبة الحديثة (IP AI Systems)",
                excerpt: "دراسة فنية مفصلة توضح كيف تتفوق كاميرات الشبكة IP في التحليل الذكي للوجوه، التنبيهات الفورية على الهاتف وحظر الإنذارات الكاذبة مقارنة بالأنظمة التقليدية.",
                imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80",
                date: getRelativeDateArabic(0), // Today
                serviceKey: "cctv"
            },
            {
                title: "أهمية جدران الحماية Fortinet في تأمين شبكات الشركات الفلسطينية",
                excerpt: "كيف تساهم أجهزة FortiGate في عزل شبكات المراقبة والكاميرات الذكية عن بيانات الموظفين لمنع تسريب البيانات لرفع مستويات الحماية السيبرانية في فلسطين.",
                imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
                date: getRelativeDateArabic(1), // Yesterday
                serviceKey: "networking"
            },
            {
                title: "دليل الدفاع المدني الفلسطيني لاعتماد أنظمة إنذار الحريق Hochiki",
                excerpt: "توضيح شامل لمعايير السلامة الـ NFPA والأنظمة المعنونة اليابانية التي تسهل وتسهم في ترخيص المنشآت والمصانع التجارية الكبرى داخل مدن فلسطين.",
                imageUrl: "https://images.unsplash.com/photo-1516216628859-9bccecab13ca?auto=format&fit=crop&w=600&q=80",
                date: getRelativeDateArabic(3), // 3 Days ago
                serviceKey: "alarm"
            },
            {
                title: "شاشات المديول LED: الخيار القادم للإعلانات وغرف العمليات الكبرى",
                excerpt: "تحليل للتوجه المتزايد نحو شاشات العرض الذكية عالية السطوع لإدارة المراقبة التلفزيونية وبناء لوحات إعلانية مميزة في الشوارع والمجمعات الفلسطينية.",
                imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
                date: getRelativeDateArabic(5), // 5 Days ago
                serviceKey: "led"
            }
        ];

        let newsFetched = false;
        let latestItems = [];

        try {
            // Method A: Fetch live tech news from rss2json
            const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://aitnews.com/feed/')}`);
            const data = await response.json();
            if (data && data.status === 'ok' && data.items && data.items.length > 0) {
                latestItems = data.items.slice(0, 4);
                newsFetched = true;
            }
        } catch (e) {
            console.warn('rss2json failed, trying AllOrigins CORS proxy...', e);
        }

        if (!newsFetched) {
            try {
                // Method B: Fetch via AllOrigins CORS Proxy and parse RSS XML
                const proxyResponse = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://aitnews.com/feed/')}`);
                const proxyData = await proxyResponse.json();
                if (proxyData && proxyData.contents) {
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(proxyData.contents, "text/xml");
                    const items = xmlDoc.querySelectorAll("item");
                    if (items && items.length > 0) {
                        const limit = Math.min(items.length, 4);
                        for (let i = 0; i < limit; i++) {
                            const item = items[i];
                            const title = item.querySelector("title")?.textContent || "";
                            const link = item.querySelector("link")?.textContent || "";
                            const pubDate = item.querySelector("pubDate")?.textContent || "";
                            const descriptionHtml = item.querySelector("description")?.textContent || "";
                            
                            // Clean description html
                            const tempDiv = document.createElement("div");
                            tempDiv.innerHTML = descriptionHtml;
                            const cleanDesc = tempDiv.textContent || tempDiv.innerText || "";
                            
                            // Image match
                            let imageUrl = "";
                            const imgMatch = descriptionHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
                            if (imgMatch && imgMatch[1]) {
                                imageUrl = imgMatch[1];
                            }

                            latestItems.push({
                                title: title,
                                link: link,
                                pubDate: pubDate,
                                description: cleanDesc,
                                thumbnail: imageUrl
                            });
                        }
                        if (latestItems.length > 0) {
                            newsFetched = true;
                        }
                    }
                }
            } catch (e2) {
                console.warn('AllOrigins proxy failed as well, showing custom fallback articles...', e2);
            }
        }

        if (newsFetched && latestItems.length > 0) {
            newsContainer.innerHTML = '';
            latestItems.forEach((item, index) => {
                let cleanDesc = item.description || "";
                if (cleanDesc.length > 140) {
                    cleanDesc = cleanDesc.substring(0, 140) + '...';
                }

                // Format date beautifully
                const pubDate = new Date(item.pubDate);
                let formattedDate = "";
                if (!isNaN(pubDate)) {
                    formattedDate = pubDate.toLocaleDateString('ar-EG', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                } else {
                    formattedDate = item.pubDate;
                }

                let imageUrl = item.thumbnail || `https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80`;

                const serviceKeys = ['cctv', 'networking', 'alarm', 'led'];
                const mappedService = serviceKeys[index % serviceKeys.length];

                const newsCard = document.createElement('div');
                newsCard.className = 'news-card';
                newsCard.innerHTML = `
                    <div class="news-image-wrapper">
                        <img src="${imageUrl}" alt="${item.title}" class="news-image" onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'">
                    </div>
                    <div class="news-content">
                        <h4 class="news-title">${item.title}</h4>
                        <p class="news-excerpt">${cleanDesc}</p>
                        <div class="news-meta">
                            <span class="news-date"><i class="far fa-calendar-alt"></i> ${formattedDate}</span>
                            <div style="display: flex; gap: 10px;">
                                <a href="${item.link}" target="_blank" class="news-link" style="color: var(--text-muted);">المصدر <i class="fas fa-external-link-alt" style="font-size: 0.75rem;"></i></a>
                                <a href="#" class="news-link" onclick="event.preventDefault(); openServiceModal('${mappedService}')">التفاصيل التقنية <i class="fas fa-arrow-left"></i></a>
                            </div>
                        </div>
                    </div>
                `;
                newsContainer.appendChild(newsCard);
            });
        } else {
            console.warn('Live news fetch failed, showing dynamic Viron Tech articles instead');
            newsContainer.innerHTML = '';
            
            fallbackArticles.forEach(art => {
                const newsCard = document.createElement('div');
                newsCard.className = 'news-card';
                newsCard.innerHTML = `
                    <div class="news-image-wrapper">
                        <img src="${art.imageUrl}" alt="${art.title}" class="news-image">
                    </div>
                    <div class="news-content">
                        <h4 class="news-title">${art.title}</h4>
                        <p class="news-excerpt">${art.excerpt}</p>
                        <div class="news-meta">
                            <span class="news-date"><i class="far fa-calendar-alt"></i> ${art.date}</span>
                            <a href="#" class="news-link" onclick="event.preventDefault(); openServiceModal('${art.serviceKey}')">عرض التفاصيل التقنية <i class="fas fa-arrow-left"></i></a>
                        </div>
                    </div>
                `;
                newsContainer.appendChild(newsCard);
            });
        }
    }

    // Modal Control and Service Auto-Request Logic
    window.openServiceModal = function(serviceKey) {
        const modal = document.getElementById('serviceDetailsModal');
        const modalContent = document.getElementById('modalBodyContent');
        if (!modal || !modalContent) return;

        const servicesData = {
            cctv: {
                title: 'أنظمة المراقبة البصرية الذكية (CCTV)',
                icon: 'fa-video',
                desc: 'تصميم وبناء غرف المراقبة المتكاملة للمؤسسات الكبرى والمنازل الذكية. نعتمد أرقى المعايير التقنية لنظام مراقبة متكامل يحميك على مدار الساعة.',
                details: [
                    '<strong>كاميرات IP الذكية:</strong> تحليل ذكي مدعوم بالذكاء الاصطناعي لكشف الوجوه والتسلل البشري وتقصي لوحات المركبات (ANPR).',
                    '<strong>الكاميرات التماثلية (HD Analog):</strong> حلول اقتصادية وبث فوري مستقر للرصد العام للمساحات الواسعة.',
                    '<strong>أجهزة التسجيل الرقمية (NVR/DVR):</strong> سعات تخزينية ضخمة تدعم الضغط الذكي (H.265+) لتقليل استهلاك مساحة الأقراص.',
                    '<strong>المراقبة عن بعد:</strong> ربط مباشر وسريع لعرض الكاميرات على الهواتف الذكية والأجهزة اللوحية من أي مكان في العالم.'
                ],
                brands: ['Dahua (دهوا)', 'Hikvision (هايك فيجين)', 'Uniview (يوني فيو)', 'Tiandy (تياندي)']
            },
            networking: {
                title: 'هندسة الشبكات وتأمين البنية التحتية',
                icon: 'fa-network-wired',
                desc: 'تصميم وبناء الشبكات المحلية والممتدة للشركات والمصانع وتأمينها بأعلى حماية سيبرانية لمنع أي وصول غير مصرح به أو اختراق.',
                details: [
                    '<strong>جدران الحماية (Fortinet):</strong> برمجة وتأمين خط الدفاع الأول بأقوى جدران حماية فورتي جيت، وعزل الشبكات الحساسة.',
                    '<strong>تقسيم الشبكات (VLANs):</strong> زيادة سرعة وأمن الشبكة عبر تقسيم مسارات البيانات (كاميرات، موظفين، إدارة، زوار).',
                    '<strong>تمديد الألياف الضوئية (Fiber Splicing):</strong> ربط سريع عالي السرعة للمسافات البعيدة عبر كابلات الفايبر واللحام الفني.',
                    '<strong>توزيع البث اللاسلكي:</strong> تغطية واي فاي 6 فائقة السرعة مع ميزة التجوال السلس (Seamless Roaming) بدون انقطاع.'
                ],
                brands: ['Fortinet (فورتي نت)', 'TP-Link Enterprise', 'Cisco Systems', 'Aruba Networks']
            },
            sound: {
                title: 'أنظمة الصوت والنداء الموزع',
                icon: 'fa-volume-up',
                desc: 'توفير أنظمة صوتية هندسية واضحة النقاوة، متطورة لتوزيع الصوت والنداء الموجه للمساجد، الفنادق، المستشفيات، والمؤسسات العامة.',
                details: [
                    '<strong>النداء الموزع (Zonal Paging):</strong> إمكانية توجيه الرسائل الصوتية والنداء لمناطق معينة دون الأخرى بكل مرونة.',
                    '<strong>التكامل الطارئ:</strong> ربط ذكي وتلقائي مع أنظمة إنذار الحريق لتوجيه الإخلاء والرسائل المسجلة سلفاً.',
                    '<strong>موسيقى الخلفية (BGM):</strong> توزيع سماعات سقفية وجدارية فاخرة لبث نقي في صالات الفنادق والمعارض والمطاعم.',
                    '<strong>مقاومة العوامل الجوية:</strong> توريد سماعات حدائق وخارجية مقاومة للرطوبة ودرجات الحرارة المرتفعة.'
                ],
                brands: ['Bosch', 'TOA', 'ITC Audio', 'Yamaha', 'Audac']
            },
            access: {
                title: 'أنظمة التحكم بالوصول والحضور والانصراف',
                icon: 'fa-fingerprint',
                desc: 'ضبط أمان وحركات دخول الموظفين والزوار لأبواب ومناطق المنشأة الحساسة مع تقارير برمجية فورية ومفصلة.',
                details: [
                    '<strong>التحقق الذكي:</strong> التحكم في فتح الأبواب عبر بصمات الوجه بدون تلامس، بصمة الكف، أو البطاقات الذكية.',
                    '<strong>تقارير الحضور:</strong> برامج مطورة لإصدار كشوفات التأخير والغياب والمناوبات وتكاملها التلقائي مع الـ ERP.',
                    '<strong>أقفال كهرومغناطيسية:</strong> أمان فيزيائي للأبواب الزجاجية والخشبية والحديدية مع أنظمة الفتح الطارئ عند الحرائق.',
                    '<strong>إدارة مركزية:</strong> إمكانية ربط أفرع الشركة المتباعدة ببرنامج موحد لمراقبة وإدارة صلاحيات الموظفين.'
                ],
                brands: ['ZKTeco', 'Suprema', 'HID Global', 'ZK-BioSecurity']
            },
            alarm: {
                title: 'أنظمة السلامة وكشف الحريق والسرقة',
                icon: 'fa-fire-extinguisher',
                desc: 'حماية الأرواح والمنشآت عبر أنظمة إنذار حريق مبكر متقدمة ومطابقة للمواصفات العالمية والشرطة والدفاع المدني الفلسطيني.',
                details: [
                    '<strong>الأنظمة المعنونة (Addressable):</strong> تحديد نقطة الحريق أو الدخان بدقة متناهية على شاشة اللوحة الرئيسية فوراً.',
                    '<strong>المطابقة والسلامة:</strong> تصميم واعتماد لوحات Hochiki اليابانية المعترف بها كأعلى مرجعية أمان وترخيص بفلسطين.',
                    '<strong>الإنذار ضد السرقة:</strong> حساسات حركة، كواسر زجاج، وحساسات أبواب مع صافرات إنذار وتنبيهات هاتفية ذكية.',
                    '<strong>التشغيل الذاتي:</strong> تكامل الأنظمة مع خطوط الإخلاء، قطع التكييف المركزي، وتفعيل مخارج طوارئ المباني.'
                ],
                brands: ['Hochiki (اليابانية)', 'Honeywell', 'Cooper', 'Teletek']
            },
            led: {
                title: 'شاشات العرض والمديول (LED Screens)',
                icon: 'fa-desktop',
                desc: 'شاشات العرض المديول العملاقة لغايات الدعاية والترويج الخارجي أو لعرض وبث غرف التحكم المركزية والاجتماعات.',
                details: [
                    '<strong>شاشات مديول داخلية (Indoor):</strong> سطوع متزن ودقة متناهية ومعدل تحديث عالٍ مناسبة للمعارض والاجتماعات.',
                    '<strong>شاشات مديول خارجية (Outdoor):</strong> مقاومة كاملة للمطر والعوامل الجوية مع سطوع فائق القوة للرؤية بضوء الشمس.',
                    '<strong>جدران الفيديو (Video Walls):</strong> تجميع شاشات رفيعة الحواف لغرف مراقبة الكاميرات والشبكات المركزية.',
                    '<strong>برمجيات التحكم:</strong> بطاقات إرسال وتلقي ومعالجات فيديو متطورة للبث المباشر والجدولة الذكية للمحتوى.'
                ],
                brands: ['Indoor LED Modules', 'Outdoor LED Modules', 'Video Processors', 'NovaStar Control']
            }
        };

        const data = servicesData[serviceKey];
        if (!data) return;

        let brandTags = '';
        data.brands.forEach(brand => {
            brandTags += `<span class="modal-brand-tag">${brand}</span>`;
        });

        let techDetailsList = '';
        data.details.forEach(detail => {
            techDetailsList += `<li><i class="fas fa-check-circle"></i><span>${detail}</span></li>`;
        });

        modalContent.innerHTML = `
            <div class="modal-header-info">
                <i class="fas ${data.icon}"></i>
                <div>
                    <h3>${data.title}</h3>
                    <span style="font-size:0.85rem; color: var(--accent); font-weight:700;">خدمات هندسية متكاملة</span>
                </div>
            </div>
            <p style="font-size:1rem; line-height:1.7; color: var(--text-main); margin-bottom:20px;">${data.desc}</p>
            
            <h4 class="modal-details-title"><i class="fas fa-microchip"></i> الميزات والمواصفات الفنية:</h4>
            <ul class="modal-tech-list">
                ${techDetailsList}
            </ul>

            <h4 class="modal-details-title"><i class="fas fa-tags"></i> التقنيات والماركات المعتمدة:</h4>
            <div class="modal-brands-grid">
                ${brandTags}
            </div>

            <div class="modal-footer-actions">
                <button class="btn btn-outline" style="width: auto;" onclick="closeServiceModal()">إغلاق النافذة</button>
                <button class="btn btn-primary" style="width: auto;" onclick="closeServiceModal(); requestServiceDirect('${serviceKey}')">
                    <span>طلب هذه الخدمة الآن</span>
                    <i class="fas fa-file-signature"></i>
                </button>
            </div>
        `;

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    window.closeServiceModal = function() {
        const modal = document.getElementById('serviceDetailsModal');
        if (modal) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }
    };

    window.requestServiceDirect = function(serviceKey) {
        const checkbox = document.getElementById('sys-' + serviceKey);
        const card = document.querySelector(`.system-select-card[data-sys="${serviceKey}"]`);
        
        if (checkbox) {
            if (!checkbox.checked) {
                checkbox.checked = true;
                if (card) card.classList.add('selected');
            }
            updateDynamicWizardFields();
        }

        const requestSection = document.getElementById('request');
        if (requestSection) {
            requestSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const startTestBtn = document.getElementById('startSpeedTestBtn');
    if (startTestBtn) {
        startTestBtn.addEventListener('click', startNetworkDiagnostics);
    }

    async function startNetworkDiagnostics() {
        const startBtn = document.getElementById('startSpeedTestBtn');
        const gaugeFill = document.getElementById('gaugeFill');
        const gaugeNeedle = document.getElementById('gaugeNeedle');
        const speedValue = document.getElementById('speedValue');
        const testPhase = document.getElementById('testPhase');
        const downloadVal = document.getElementById('downloadVal');
        const uploadVal = document.getElementById('uploadVal');
        const pingVal = document.getElementById('pingVal');
        const solutionsCard = document.getElementById('solutionsCard');

        if (!startBtn || !gaugeFill || !gaugeNeedle || !speedValue || !testPhase || !downloadVal || !uploadVal || !pingVal || !solutionsCard) return;

        // ── UI Reset ──────────────────────────────────────────────────────────
        startBtn.disabled = true;
        startBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري فحص الشبكة...';
        solutionsCard.style.display = 'none';
        downloadVal.innerText = '-';
        uploadVal.innerText = '-';
        pingVal.innerText = '-';
        speedValue.innerText = '0';
        updateGauge(0);

        // ── PHASE 1: Ping – measure against REAL external servers ─────────────
        testPhase.innerText = 'جاري قياس سرعة الاستجابة (Ping)...';
        let ping = 0;
        const pingTargets = [
            'https://speed.cloudflare.com/cdn-cgi/trace',
            'https://www.google.com/generate_204',
            'https://connectivitycheck.gstatic.com/generate_204'
        ];
        const pingResults = [];
        for (const target of pingTargets) {
            try {
                // Two samples per target, take the second (warm connection)
                await fetch(target, { method: 'HEAD', mode: 'no-cors', cache: 'no-store' });
                const t0 = performance.now();
                await fetch(target, { method: 'HEAD', mode: 'no-cors', cache: 'no-store' });
                const rtt = performance.now() - t0;
                if (rtt > 2) pingResults.push(rtt); // ignore suspiciously cached results
            } catch (_) { /* skip */ }
        }
        if (pingResults.length > 0) {
            pingResults.sort((a, b) => a - b);
            ping = Math.round(pingResults[0]); // best (lowest) RTT
        } else {
            ping = 99; // fallback – can't reach any external host
        }
        pingVal.innerText = ping + ' ms';
        await sleep(400);

        // ── PHASE 2: Download – real streaming measurement via Cloudflare ────
        testPhase.innerText = 'جاري فحص سرعة التحميل (Download)...';
        let maxDownload = 0;
        let downloadSuccess = false;

        async function streamMeasure(url, timeLimitMs) {
            const resp = await fetch(url, { cache: 'no-store' });
            if (!resp.ok) throw new Error('HTTP ' + resp.status);
            const reader = resp.body.getReader();
            let loaded = 0, t0 = null;
            const deadline = performance.now() + timeLimitMs;
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                if (t0 === null) t0 = performance.now();
                loaded += value.byteLength;
                const elapsed = (performance.now() - t0) / 1000;
                if (elapsed > 0.3) {
                    const mbps = (loaded * 8) / (elapsed * 1e6);
                    speedValue.innerText = Math.round(mbps);
                    updateGauge(mbps);
                }
                if (performance.now() >= deadline) {
                    reader.cancel().catch(() => {});
                    break;
                }
            }
            const elapsed = (performance.now() - t0) / 1000;
            if (!t0 || elapsed < 0.15 || loaded < 30000) throw new Error('Not enough data');
            return (loaded * 8) / (elapsed * 1e6); // Mbps
        }

        // Try two parallel 25 MB Cloudflare streams
        try {
            const urls = [
                'https://speed.cloudflare.com/__down?bytes=25000000&t=' + Date.now(),
                'https://speed.cloudflare.com/__down?bytes=25000000&t=' + (Date.now() + 1)
            ];
            const results = await Promise.allSettled(urls.map(u => streamMeasure(u, 7000)));
            const valid = results.filter(r => r.status === 'fulfilled' && r.value > 0.5).map(r => r.value);
            if (valid.length > 0) {
                // Parallel streams: sum represents total bandwidth
                maxDownload = Math.round(valid.reduce((a, b) => a + b, 0));
                downloadSuccess = true;
            }
        } catch (e) { console.warn('Primary download failed:', e); }

        // Fallback: single 10 MB stream
        if (!downloadSuccess) {
            try {
                const mbps = await streamMeasure('https://speed.cloudflare.com/__down?bytes=10000000&t=' + Date.now(), 8000);
                if (mbps > 0.5) { maxDownload = Math.round(mbps); downloadSuccess = true; }
            } catch (e) { console.warn('Fallback download failed:', e); }
        }

        if (downloadSuccess) {
            speedValue.innerText = maxDownload;
            updateGauge(maxDownload);
            downloadVal.innerText = maxDownload + ' Mbps';
        } else {
            maxDownload = 0;
            speedValue.innerText = '?';
            downloadVal.innerText = 'تعذّر القياس';
            testPhase.innerText = 'فشل فحص التحميل – تأكد من الاتصال';
        }
        await sleep(700);

        // ── PHASE 3: Upload – POST binary data to Cloudflare __up endpoint ───
        testPhase.innerText = 'جاري فحص سرعة الرفع (Upload)...';
        let maxUpload = 0;
        let uploadSuccess = false;

        try {
            // Use text/plain MIME type on the Blob – this is a CORS-safelisted content-type,
            // so the browser skips the OPTIONS preflight entirely (works from any origin).
            const size = 3 * 1024 * 1024;
            const buf = new Uint8Array(size);
            crypto.getRandomValues(buf.subarray(0, Math.min(size, 65536)));
            const blob = new Blob([buf], { type: 'text/plain' });

            const t0 = performance.now();
            await fetch('https://speed.cloudflare.com/__up?t=' + Date.now(), {
                method: 'POST',
                body: blob,
                mode: 'no-cors',   // avoids CORS preflight; response is opaque but timing is real
                cache: 'no-store'
            });
            const elapsed = (performance.now() - t0) / 1000;

            if (elapsed > 0.3) {
                maxUpload = Math.round((size * 8) / (elapsed * 1e6));
                uploadSuccess = true;
                speedValue.innerText = maxUpload;
                updateGauge(maxUpload);
            }
        } catch (e) { console.warn('Upload test failed:', e); }

        if (uploadSuccess) {
            uploadVal.innerText = maxUpload + ' Mbps';
        } else if (downloadSuccess && maxDownload > 0) {
            // Honest estimate: typical ADSL/Fiber upload is ~25-35% of download
            maxUpload = Math.max(3, Math.round(maxDownload * 0.3));
            uploadVal.innerText = '~' + maxUpload + ' Mbps (تقريبي)';
        } else {
            uploadVal.innerText = 'تعذّر القياس';
        }
        await sleep(500);

        // ── Finish UI ─────────────────────────────────────────────────────────
        speedValue.innerText = '0';
        updateGauge(0);
        testPhase.innerText = 'اكتمل الفحص بنجاح!';
        showDiagnostics(maxDownload, maxUpload, ping);

        startBtn.disabled = false;
        startBtn.innerHTML = '<i class="fas fa-redo"></i> أعد الفحص';
    }

    function updateGauge(speed) {
        const gaugeFill = document.getElementById('gaugeFill');
        const gaugeNeedle = document.getElementById('gaugeNeedle');
        if (!gaugeFill || !gaugeNeedle) return;

        const cappedSpeed = Math.min(speed, 120);
        const percentage = cappedSpeed / 120;
        
        const rotationGrad = percentage * 180;
        gaugeFill.style.transform = `rotate(${rotationGrad}deg)`;
        
        const rotationNeedle = -90 + (percentage * 180);
        gaugeNeedle.style.transform = `rotate(${rotationNeedle}deg)`;
    }

    function showDiagnostics(download, upload, ping) {
        const badge = document.getElementById('networkStatusBadge');
        const intro = document.getElementById('solutionsIntro');
        const list = document.getElementById('solutionsList');
        const solutionsCard = document.getElementById('solutionsCard');
        
        if (!badge || !intro || !list || !solutionsCard) return;
        
        list.innerHTML = '';
        badge.className = 'status-badge';

        let solutions = [];
        let introText = "";
        let statusClass = "";
        let badgeText = "";

        if (download >= 50) {
            statusClass = 'excellent';
            badgeText = 'اتصال ممتاز 🚀';
            introText = `سرعة اتصالك ممتازة وتبلغ **${download} Mbps** مع زمن استجابة (Ping) يبلغ **${ping} ms**. هذه السرعة مثالية لتشغيل أحدث المنظومات الأمنية وحلول الجهد المنخفض دون أي بطء.`;
            solutions = [
                "الشبكة تدعم تشغيل نظام كاميرات مراقبة IP بدقة 4K فائقة الوضوح وبث مباشر مستمر دون أي تأخير.",
                "يمكنك ربط وتشغيل العديد من أجهزة المنزل الذكي (IoT) والأنظمة الصوتية المتكاملة بكفاءة عالية وبدون مشاكل في الترددات.",
                "زمن الاستجابة (Ping) لديك مثالي للألعاب السحابية، البث المباشر، والاجتماعات المرئية عالية الدقة.",
                "توصية: تأكد من استخدام مقويات شبكة Wi-Fi 6 (مثل Access Points من UniFi أو Aruba) للاستفادة الكاملة من هذه السرعة في جميع أرجاء المبنى."
            ];
        } else if (download >= 20) {
            statusClass = 'good';
            badgeText = 'اتصال مستقر 👍';
            introText = `اتصالك جيد ومستقر بسرعة **${download} Mbps** وزمن استجابة **${ping} ms**. السرعة جيدة جداً للتصفح والأعمال اليومية، ولكن يفضل اتخاذ بعض الإجراءات لضمان ثبات أنظمة الكاميرات والشبكات الذكية.`;
            solutions = [
                "توصية هندسية: يفضل فصل شبكة الكاميرات والأنظمة الذكية (VLAN) عن شبكة الاستخدام الشخصي (الإنترنت العام للموظفين أو العائلة) لضمان عدم تأثر جودة الكاميرات بالاستخدام العام.",
                "يفضل ضبط جودة تسجيل الكاميرات على دقة 1080p (Full HD) بدلاً من 4K لتوفير سعة البيانات للشبكة ومنع التقطيع.",
                "إذا كان لديك أكثر من 8 كاميرات مراقبة، يفضل ربط الكاميرات الأساسية عبر كابلات Ethernet نحاسية بدلاً من الواي فاي لضمان استقرار البث."
            ];
        } else {
            statusClass = 'weak';
            badgeText = 'اتصال ضعيف ⚠️';
            introText = `سرعة اتصالك منخفضة وتساوي **${download} Mbps** مع بنج يبلغ **${ping} ms**. قد تواجه بطئاً أو تقطيعاً عند استعراض بث الكاميرات عن بعد أو تشغيل الأنظمة الذكية.`;
            solutions = [
                "توصية حرجة: تجنب تماماً ربط كاميرات المراقبة بالواي فاي؛ استخدم كابلات الشبكة Cat6 النحاسية وتغذيتها بـ PoE للحصول على بث مستمر بلا انقطاع.",
                "قم بفحص قنوات الواي فاي (Wi-Fi Channels) في جهاز التوجيه (Router) لمنع التداخل والتشويش من الشبكات المحيطة بك.",
                "ننصحك بالتواصل مع مزود خدمة الإنترنت لترقية سرعة خطك، أو التحقق من جودة الكابل الرئيسي الواصل للمبنى لوجود تآكل أو مشاكل فنية.",
                "لغايات المراقبة الخارجية المستمرة، يفضل تخزين الفيديوهات على جهاز تسجيل محلي NVR بدلاً من التخزين السحابي (Cloud Storage) لتجنب استهلاك سرعة الإنترنت الضعيفة."
            ];
        }

        badge.classList.add(statusClass);
        badge.innerText = badgeText;
        intro.innerHTML = introText.replace(/\*\*([^*]+)\*\*/g, '<strong style="color:var(--text-main); font-weight:700;">$1</strong>');

        solutions.forEach(sol => {
            const li = document.createElement('li');
            li.innerText = sol;
            list.appendChild(li);
        });

        solutionsCard.style.display = 'block';
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function easeOutQuad(x) {
        return 1 - (1 - x) * (1 - x);
    }

    // 8. Newsletter Form Submission (Formspree AJAX)
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitBtn = document.getElementById('newsletterSubmitBtn');
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (!submitBtn || !emailInput) return;

            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';

            try {
                const response = await fetch('https://formspree.io/f/xbdbdvev', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: emailInput.value
                    })
                });

                if (response.ok) {
                    alert('شكرًا لك! تم الاشتراك بنجاح في قائمتنا البريدية.');
                    newsletterForm.reset();
                } else {
                    throw new Error('Failed to submit form');
                }
            } catch (error) {
                console.error('Newsletter error:', error);
                alert('عذرًا، حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى لاحقًا.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

    // Run News fetch
    fetchLiveNews();
});
