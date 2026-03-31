document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm');
    const clearBtn = document.getElementById('clearData');

    // If there is saved resume data, pre-fill the form so user can edit values
    try {
        const raw = localStorage.getItem('resumeData');
        if (raw) {
            const saved = JSON.parse(raw);
            const fields = ['name','title','phone','email','github','linkedin','summary','school10','year10','school12','year12','college','collegeYear','collegeDesc','template'];
            fields.forEach(f => {
                const el = document.getElementById(f);
                if (el && saved[f]) el.value = saved[f];
            });
            const compactEl = document.getElementById('compact');
            if (compactEl) compactEl.checked = !!saved.compact;
        } else {
            // set sensible defaults when no saved data exists
            const collegeEl = document.getElementById('college');
            const collegeYearEl = document.getElementById('collegeYear');
            const collegeDescEl = document.getElementById('collegeDesc');
            if (collegeEl && !collegeEl.value) collegeEl.value = 'Mind Power University';
            if (collegeYearEl && !collegeYearEl.value) collegeYearEl.value = 'Ongoing';
            if (collegeDescEl && !collegeDescEl.value) collegeDescEl.value = 'Pursuing B.Tech (CSE) at Mind Power University.';
            // default to compact (hide optional sections) for a concise resume
            const compactEl = document.getElementById('compact');
            if (compactEl) compactEl.checked = true;
        }
    } catch (err) {
        console.warn('Could not prefill builder form:', err);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById('name').value.trim(),
            title: document.getElementById('title').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            github: document.getElementById('github').value.trim(),
            linkedin: document.getElementById('linkedin').value.trim(),
            summary: document.getElementById('summary').value.trim()
        };
        // education fields
        data.school10 = document.getElementById('school10').value.trim();
        data.year10 = document.getElementById('year10').value.trim();
        data.school12 = document.getElementById('school12').value.trim();
        data.year12 = document.getElementById('year12').value.trim();
        data.college = document.getElementById('college').value.trim();
        data.collegeYear = document.getElementById('collegeYear').value.trim();
        data.collegeDesc = document.getElementById('collegeDesc') ? document.getElementById('collegeDesc').value.trim() : '';
        data.compact = document.getElementById('compact').checked;
        data.template = document.getElementById('templateSelect') ? document.getElementById('templateSelect').value : 'classic';
        try {
            localStorage.setItem('resumeData', JSON.stringify(data));
            window.location.href = 'resume.html';
        } catch (err) {
            alert('Could not save data: ' + err.message);
        }
    });

    clearBtn.addEventListener('click', () => {
        if (confirm('Clear saved resume data?')) {
            localStorage.removeItem('resumeData');
            alert('Saved data cleared.');
        }
    });
});
