async function loadProjects() {
    const listEl = document.getElementById('projectsList');
    const searchEl = document.getElementById('projectSearch');
    const techFilter = document.getElementById('techFilter');
    const typeFilter = document.getElementById('typeFilter');

    let projects = [];
    try {
        const res = await fetch('projects/data/projects.json');
        projects = await res.json();
    } catch (err) {
        listEl.innerHTML = '<p>Failed to load projects.</p>';
        console.error(err);
        return;
    }

    // build tech list
    const techs = new Set();
    projects.forEach(p => p.tech.forEach(t => techs.add(t)));
    techs.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        techFilter.appendChild(opt);
    });

    function render(filtered) {
        if (!filtered.length) {
            listEl.innerHTML = '<p>No projects found.</p>';
            return;
        }
        listEl.innerHTML = '';
        filtered.forEach(p => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <h3>${p.title}</h3>
                <p>${p.short}</p>
                <p><strong>Tech:</strong> ${p.tech.join(', ')}</p>
                <div style="display:flex; gap:0.5rem; margin-top:0.5rem">
                    <a class="btn" href="project-template.html?id=${encodeURIComponent(p.id)}">Details</a>
                    ${p.github ? `<a class="btn outline" href="${p.github}" target="_blank">GitHub</a>` : ''}
                    ${p.demo ? `<a class="btn outline" href="${p.demo}" target="_blank">Demo</a>` : ''}
                </div>
            `;
            listEl.appendChild(card);
        });
    }

    function applyFilters() {
        const q = searchEl.value.trim().toLowerCase();
        const tech = techFilter.value;
        const type = typeFilter.value;
        let filtered = projects.filter(p => {
            const matchesQ = !q || (p.title + ' ' + p.short + ' ' + p.description).toLowerCase().includes(q);
            const matchesTech = !tech || p.tech.includes(tech);
            const matchesType = !type || p.type === type;
            return matchesQ && matchesTech && matchesType;
        });
        render(filtered);
    }

    searchEl.addEventListener('input', applyFilters);
    techFilter.addEventListener('change', applyFilters);
    typeFilter.addEventListener('change', applyFilters);

    // initial render
    render(projects);
}

document.addEventListener('DOMContentLoaded', loadProjects);
