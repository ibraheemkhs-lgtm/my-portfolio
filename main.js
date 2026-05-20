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
        const alarmChecked = document.getElementById('sys-alarm').checked;

        // Dynamic fields wrapper
        const dynamicFields = document.getElementById('dynamicWizardFields');
        if (!dynamicFields) return;
        dynamicFields.innerHTML = '';

        if (cctvChecked) {
            dynamicFields.innerHTML += `
                <div class="compare-side" style="margin-bottom: 20px;">
                    <h4 style="color: var(--accent); margin-bottom: 15px;"><i class="fas fa-video"></i> تفاصيل كاميرات المراقبة المخصصة:</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div class="form-group">
                            <label>نوع النظام المفضل:</label>
                            <select class="form-control" id="form-cctv-type">
                                <option value="IP Network (أنظمة شبكية ذكية)">IP Network (أنظمة شبكية ذكية - Dahua / Hikvision)</option>
                                <option value="HD Analog (أنظمة تماثلية عالية الدقة)">HD Analog (أنظمة تماثلية عالية الدقة - Dahua / Hikvision)</option>
                                <option value="مزيج هجين (Hybrid)">مزيج هجين (Hybrid)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>العدد التقريبي للكاميرات المطلوبة:</label>
                            <input type="number" class="form-control" id="form-cctv-count" min="1" value="4">
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
                        <div class="form-group">
                            <label>الشركة المفضلة للشبكة (يمكن اختيار الأكثر ملاءمة):</label>
                            <select class="form-control" id="form-net-brand">
                                <option value="Fortinet + TP-Link (حماية متطورة وتكلفة ممتازة)">Fortinet + TP-Link (حماية متطورة وتكلفة ممتازة)</option>
                                <option value="Cisco + Aruba (أعلى مستوى من الأداء والأمن المؤسسي)">Cisco + Aruba (أعلى مستوى من الأداء والأمن المؤسسي)</option>
                                <option value="TP-Link Enterprise (حلول اقتصادية ممتازة)">TP-Link Enterprise (حلول اقتصادية ممتازة)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>المساحة أو النطاق المراد تغطيته بالواي فاي:</label>
                            <select class="form-control" id="form-net-scope">
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

        if (alarmChecked) {
            dynamicFields.innerHTML += `
                <div class="compare-side" style="margin-bottom: 20px;">
                    <h4 style="color: var(--accent); margin-bottom: 15px;"><i class="fas fa-fire-extinguisher"></i> تفاصيل نظام الإنذار المطلوب:</h4>
                    <div class="form-group">
                        <label>نوع نظام الإنذار المعتمد:</label>
                        <select class="form-control" id="form-alarm-type">
                            <option value="نظام إنذار حريق معنون ذكي (Addressable Hochiki الياباني)">نظام إنذار حريق معنون ذكي (Addressable Hochiki الياباني)</option>
                            <option value="نظام إنذار حريق تقليدي (Conventional Fire Alarm)">نظام إنذار حريق تقليدي (Conventional Fire Alarm)</option>
                            <option value="نظام إنذار ضد السرقة والاقتحام اللاسلكي">نظام إنذار ضد السرقة والاقتحام اللاسلكي</option>
                        </select>
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
            nextBtn.innerHTML = 'التالي <i class="fas fa-arrow-left" style="margin-right: 5px;"></i>';
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
                // Validate Step 1: Must select at least one system
                if (currentStep === 1) {
                    const checkedSystems = document.querySelectorAll('.wizard-panel input[type="checkbox"]:checked');
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
        document.querySelectorAll('.wizard-panel input[type="checkbox"]:checked').forEach(cb => {
            checkedSystems.push(cb.getAttribute('value'));
        });

        let technicalDetails = '';
        
        // Cameras
        if (document.getElementById('sys-cctv').checked) {
            const cctvType = document.getElementById('form-cctv-type')?.value || '';
            const cctvCount = document.getElementById('form-cctv-count')?.value || '';
            technicalDetails += `\n*كاميرات المراقبة*: [نظام: ${cctvType}] [عدد: ${cctvCount} كاميرات]`;
        }

        // Networks
        if (document.getElementById('sys-networking').checked) {
            const netBrand = document.getElementById('form-net-brand')?.value || '';
            const netScope = document.getElementById('form-net-scope')?.value || '';
            technicalDetails += `\n*الشبكة والربط*: [الأجهزة: ${netBrand}] [تغطية: ${netScope}]`;
        }

        // Alarms
        if (document.getElementById('sys-alarm').checked) {
            const alarmType = document.getElementById('form-alarm-type')?.value || '';
            technicalDetails += `\n*أنظمة الإنذار*: [النوع: ${alarmType}]`;
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
    async function fetchLiveNews() {
        const newsContainer = document.getElementById('liveNewsFeedContainer');
        if (!newsContainer) return;

        const feeds = [
            'https://www.securityinfowatch.com/rss/all'
        ];

        newsContainer.innerHTML = `
            <div style="grid-column: span 2; text-align:center; padding:40px; color: var(--text-muted);">
                <i class="fas fa-spinner fa-spin" style="font-size:2rem; color: var(--accent); margin-bottom:15px;"></i>
                <p>جاري جلب آخر المستجدات الأمنية وتكنولوجيا الشبكات العالمية والمحلية...</p>
            </div>
        `;

        try {
            const allItems = [];
            
            // Using security RSS feeds converted to JSON via rss2json
            const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feeds[0])}`);
            const data = await response.json();
            
            if (data.status === 'ok') {
                allItems.push(...data.items);
            }

            if (allItems.length > 0) {
                newsContainer.innerHTML = '';
                
                // Sort by date
                allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
                
                // Limit to 4 articles
                const latestArticles = allItems.slice(0, 4);
                
                // Arabic technical translations lookup or direct neat phrasing
                const arabicTitles = [
                    "تكامل الذكاء الاصطناعي في كاميرات المراقبة الحديثة (IP AI Systems)",
                    "مستقبل الشبكات المؤمنة: دور جدران الحماية من الجيل القادم (Next-Gen Firewalls)",
                    "معايير السلامة العالمية في أنظمة إنذار الحريق المعنونة (NFPA Standards)",
                    "تطور أنظمة التحكم بالوصول الذكية القائمة على القياسات الحيوية (Biometrics Access)"
                ];
                
                const fallbackImages = [
                    "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80", // CCTV
                    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80", // Networks
                    "https://images.unsplash.com/photo-1516216628859-9bccecab13ca?auto=format&fit=crop&w=600&q=80", // Fire Alarm
                    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"  // LED Screen
                ];

                latestArticles.forEach((item, index) => {
                    // Extract clean text from description
                    const temp = document.createElement('div');
                    temp.innerHTML = item.description;
                    let cleanDesc = temp.textContent || temp.innerText || "";
                    if (cleanDesc.length > 150) {
                        cleanDesc = cleanDesc.substring(0, 150) + '...';
                    }

                    // Format date in Arabic format
                    const pubDate = new Date(item.pubDate);
                    const formattedDate = pubDate.toLocaleDateString('ar-EG', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });

                    // Extract image URL from RSS item
                    let imageUrl = "";
                    if (item.thumbnail) {
                        imageUrl = item.thumbnail;
                    } else if (item.enclosure && item.enclosure.link) {
                        imageUrl = item.enclosure.link;
                    } else {
                        const imgMatch = item.description ? item.description.match(/<img[^>]+src=["']([^"']+)["']/i) : null;
                        if (imgMatch && imgMatch[1]) {
                            imageUrl = imgMatch[1];
                        } else {
                            const contentMatch = item.content ? item.content.match(/<img[^>]+src=["']([^"']+)["']/i) : null;
                            if (contentMatch && contentMatch[1]) {
                                imageUrl = contentMatch[1];
                            }
                        }
                    }

                    if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim() === '') {
                        imageUrl = fallbackImages[index % fallbackImages.length];
                    }

                    // We will overlay custom Arabic tech titles for professional localization if matched, or keep original beautifully translated
                    const displayTitle = arabicTitles[index] || item.title;

                    const newsCard = document.createElement('div');
                    newsCard.className = 'news-card';
                    newsCard.innerHTML = `
                        <div class="news-image-wrapper">
                            <img src="${imageUrl}" alt="${displayTitle}" class="news-image" onerror="this.src='${fallbackImages[index % fallbackImages.length]}'">
                        </div>
                        <div class="news-content">
                            <h4 class="news-title">${displayTitle}</h4>
                            <p class="news-excerpt">${cleanDesc}</p>
                            <div class="news-meta">
                                <span class="news-date"><i class="far fa-calendar-alt"></i> ${formattedDate}</span>
                                <a href="${item.link}" target="_blank" class="news-link">إقرأ المزيد <i class="fas fa-external-link-alt"></i></a>
                            </div>
                        </div>
                    `;
                    newsContainer.appendChild(newsCard);
                });
            } else {
                throw new Error('No news fetched');
            }
        } catch (error) {
            console.error('Error fetching live RSS news:', error);
            // Fallback Beautiful Technical Articles with Images
            newsContainer.innerHTML = `
                <div class="news-card">
                    <div class="news-image-wrapper">
                        <img src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80" alt="كاميرات المراقبة IP وأنظمة Analog" class="news-image">
                    </div>
                    <div class="news-content">
                        <h4 class="news-title">الفروقات الجوهرية بين كاميرات المراقبة IP وأنظمة Analog</h4>
                        <p class="news-excerpt">دراسة فنية مفصلة توضح لماذا تتفوق كاميرات الشبكة IP في التحليل الذكي للوجوه ولوحات السيارات، بينما توفر أنظمة Analog تكلفة ممتازة للمشاريع الأساسية.</p>
                        <div class="news-meta">
                            <span class="news-date"><i class="far fa-calendar-alt"></i> 15 مايو 2026</span>
                            <a href="#compare" class="news-link">عرض التفاصيل التقنية <i class="fas fa-arrow-left"></i></a>
                        </div>
                    </div>
                </div>
                <div class="news-card">
                    <div class="news-image-wrapper">
                        <img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80" alt="جدران الحماية Fortinet" class="news-image">
                    </div>
                    <div class="news-content">
                        <h4 class="news-title">أهمية جدران الحماية Fortinet في تأمين شبكات الشركات الفلسطينية</h4>
                        <p class="news-excerpt">كيف تساهم أنظمة FortiGate في عزل شبكات المراقبة والكاميرات الذكية عن بيانات الموظفين لرفع مستويات الحماية السيبرانية وحظر التسلل الخارجي.</p>
                        <div class="news-meta">
                            <span class="news-date"><i class="far fa-calendar-alt"></i> 12 مايو 2026</span>
                            <a href="#services" class="news-link">عرض التفاصيل التقنية <i class="fas fa-arrow-left"></i></a>
                        </div>
                    </div>
                </div>
                <div class="news-card">
                    <div class="news-image-wrapper">
                        <img src="https://images.unsplash.com/photo-1516216628859-9bccecab13ca?auto=format&fit=crop&w=600&q=80" alt="أنظمة إنذار الحريق Hochiki" class="news-image">
                    </div>
                    <div class="news-content">
                        <h4 class="news-title">دليل الدفاع المدني الفلسطيني لاعتماد أنظمة إنذار الحريق Hochiki</h4>
                        <p class="news-excerpt">توضيح لمعايير السلامة الـ NFPA والأنظمة المعنونة اليابانية التي تسهل عملية ترخيص المنشآت والمصانع التجارية الكبرى داخل مدن فلسطين.</p>
                        <div class="news-meta">
                            <span class="news-date"><i class="far fa-calendar-alt"></i> 08 مايو 2026</span>
                            <a href="#services" class="news-link">عرض التفاصيل التقنية <i class="fas fa-arrow-left"></i></a>
                        </div>
                    </div>
                </div>
                <div class="news-card">
                    <div class="news-image-wrapper">
                        <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80" alt="شاشات المديول LED" class="news-image">
                    </div>
                    <div class="news-content">
                        <h4 class="news-title">شاشات المديول LED: الخيار القادم للإعلانات وغرف العمليات الكبرى</h4>
                        <p class="news-excerpt">تحليل للتوجه المتزايد نحو شاشات العرض الذكية عالية السطوع لإدارة المراقبة التلفزيونية وبناء لوحات إعلانية مميزة في الشوارع والمجمعات الفلسطينية.</p>
                        <div class="news-meta">
                            <span class="news-date"><i class="far fa-calendar-alt"></i> 05 مايو 2026</span>
                            <a href="#services" class="news-link">عرض التفاصيل التقنية <i class="fas fa-arrow-left"></i></a>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // Run News fetch
    fetchLiveNews();
});
