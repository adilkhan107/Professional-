document.addEventListener('DOMContentLoaded', () => {
    try {
        const raw = localStorage.getItem('resumeData');
        if (!raw) return;
        const data = JSON.parse(raw);

        if (data.name) document.getElementById('res-name').textContent = data.name;
        if (data.title) document.getElementById('res-title').textContent = data.title;

        const phoneEl = document.getElementById('res-phone');
        if (data.phone && phoneEl) {
            phoneEl.textContent = data.phone;
            phoneEl.href = 'tel:' + data.phone.replace(/\s+/g, '');
        }

        const emailEl = document.getElementById('res-email');
        if (data.email && emailEl) {
            emailEl.textContent = data.email;
            emailEl.href = 'mailto:' + data.email;
        }

        const ghEl = document.getElementById('res-github');
        if (data.github && ghEl) {
            ghEl.textContent = data.github.replace(/^https?:\/\//, '');
            ghEl.href = data.github;
        }

        const liEl = document.getElementById('res-linkedin');
        if (data.linkedin && liEl) {
            liEl.textContent = data.linkedin.replace(/^https?:\/\//, '');
            liEl.href = data.linkedin;
        }

        if (data.summary) document.getElementById('res-summary').textContent = data.summary;

        // apply template style class
        try {
            const container = document.querySelector('.resume-container');
            const header = document.querySelector('.resume-header');
            if (container) {
                if (data.template === 'professional') {
                    container.classList.add('template-professional');
                    if (header) header.classList.add('banner-style');
                } else {
                    container.classList.remove('template-professional');
                    if (header) header.classList.remove('banner-style');
                }
            }
        } catch (err) {
            console.warn('Failed to apply template class', err);
        }

        // education: college, 12th, 10th
        if (data.college && document.getElementById('res-college')) {
            document.getElementById('res-college').textContent = data.college;
        }
        if (data.collegeYear && document.getElementById('res-college-year')) {
            document.getElementById('res-college-year').textContent = data.collegeYear;
        }
        if (data.collegeDesc && document.getElementById('res-college-desc')) {
            document.getElementById('res-college-desc').textContent = data.collegeDesc;
        }
        if (data.school12 && document.getElementById('res-school12-name')) {
            document.getElementById('res-school12-name').textContent = data.school12;
        }
        if (data.year12 && document.getElementById('res-year12')) {
            document.getElementById('res-year12').textContent = data.year12;
        }
        if (data.school10 && document.getElementById('res-school10-name')) {
            document.getElementById('res-school10-name').textContent = data.school10;
        }
        if (data.year10 && document.getElementById('res-year10')) {
            document.getElementById('res-year10').textContent = data.year10;
        }

        // compact mode: hide optional sections
        if (data.compact) {
            document.querySelectorAll('[data-section="optional"]').forEach(el => el.style.display = 'none');
        }
    } catch (err) {
        console.warn('Failed to load resume data:', err);
    }
});
