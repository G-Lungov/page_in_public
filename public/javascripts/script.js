// Função para trocar entre as páginas PAGE, STYLE, STATS e SETTINGS
function showPage(page) {
    const pages = ['pageContent', 'styleContent', 'statsContent', 'settingsContent'];
    const navbarItems = document.querySelectorAll('.navbar-brand');

    pages.forEach(p => {
        const content = document.getElementById(p);
        if (p === page + 'Content') {
            content.classList.remove('d-none');
        } else {
            content.classList.add('d-none');
        }
    });

    navbarItems.forEach(item => {
        if (item.textContent.toUpperCase().includes(page.toUpperCase())) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    if (page === 'settings') {
        showSettingsPage('domain');  // Exibir a sub-aba "Domain" por padrão
    }
}

// Função para mostrar a sub-aba de configurações selecionada
function showSettingsPage(subPage) {
    const subPages = ['settingsDomainContent', 'settingsBillingContent'];
    const navbarItems = document.querySelectorAll('#settingsContent .navbar-brand');

    subPages.forEach(p => {
        const content = document.getElementById(p);
        if (p === 'settings' + subPage.charAt(0).toUpperCase() + subPage.slice(1) + 'Content') {
            content.classList.remove('d-none');
        } else {
            content.classList.add('d-none');
        }
    });

    navbarItems.forEach(item => {
        if (item.textContent.toUpperCase().includes(subPage.toUpperCase())) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("JavaScript is working!");
    // Dados de exemplo para os últimos 7 dias
    const siteVisits = [0, 0, 0, 0, 0, 0, 0];
    const linkClicks = [0, 0, 0, 0, 0, 0, 0];

    // Atualiza o gráfico
    function updateStatsChart() {
        const ctx = document.getElementById('statsChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
                datasets: [
                    {
                        label: 'Visits',
                        data: siteVisits,
                        borderColor: 'rgba(75, 192, 192, 1)'
                    },
                    {
                        label: 'Clicks',
                        data: linkClicks,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Count',
                        },
                    }
                }
            }
        });
    }

    // Carregar o gráfico ao abrir a aba STATS
    updateStatsChart();
});

// Função para aplicar estilos ao preview da aba PAGE
function applyStylesToPagePreview() {
    const stylePreviewContent = document.getElementById('stylePreviewContent');
    const pagePreviewContent = document.getElementById('previewContent');

    pagePreviewContent.style.backgroundColor = stylePreviewContent.style.backgroundColor;
    pagePreviewContent.style.color = stylePreviewContent.style.color;
    pagePreviewContent.style.fontFamily = stylePreviewContent.style.fontFamily;

    const companyListStyle = document.getElementById('companyListStyle');
    companyListStyle.style.color = stylePreviewContent.style.color;

    const companyLinks = document.querySelectorAll('.company-link');
    const linkColor = document.getElementById('linkColor').value;
    companyLinks.forEach(function(link) {
        link.style.color = linkColor;
    });

    const hoverColor = document.getElementById('hoverColor').value;
    const companyListItems = document.querySelectorAll('.company-item-style');
    companyListItems.forEach(function(item) {
        item.style.backgroundColor = 'transparent'; // Limpa qualquer cor de hover anterior
        item.addEventListener('mouseenter', function() {
            item.style.backgroundColor = hoverColor;
        });
        item.addEventListener('mouseleave', function() {
            item.style.backgroundColor = 'transparent';
        });
    });

    // Aplica o estilo de hover na aba PAGE
    const pageListItems = document.querySelectorAll('.company-item');
    pageListItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            item.style.backgroundColor = hoverColor;
        });
        item.addEventListener('mouseleave', function() {
            item.style.backgroundColor = 'transparent';
        });
    });
}


// Função para adicionar informações do usuário
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const photoInput = document.getElementById('userPhoto');
    const description = document.getElementById('userDescription').value;

    const reader = new FileReader();
    reader.onload = function(e) {
        const profilePhoto = document.getElementById('profilePhoto');
        profilePhoto.src = e.target.result;
        profilePhoto.classList.remove('d-none');
        const profilePhotoStyle = document.getElementById('profilePhotoStyle');
        profilePhotoStyle.src = e.target.result;
        profilePhotoStyle.classList.remove('d-none');
    }
    reader.readAsDataURL(photoInput.files[0]);

    document.getElementById('profileDescription').innerText = description;
    document.getElementById('profileDescriptionStyle').innerText = description;

    document.getElementById('userForm').reset();
});

// Função para adicionar informações da empresa
document.getElementById('companyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('companyName').value;
    const description = document.getElementById('companyDescription').value;
    const link = document.getElementById('companyLink').value;

    const companyItem = document.createElement('li');
    companyItem.classList.add('company-item');
    companyItem.innerHTML = `
        <a href="${link}" class="company-link">
            <h5>${name}</h5>
            <p>${description}</p>
        </a>
    `;
    document.getElementById('companyList').appendChild(companyItem);

    const companyItemStyle = companyItem.cloneNode(true);
    companyItemStyle.classList.add('company-item-style');
    document.getElementById('companyListStyle').appendChild(companyItemStyle);

    document.getElementById('companyForm').reset();
});

// Função para aplicar estilos no preview de acordo com os inputs
document.getElementById('styleForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Coleta dos valores dos inputs
    const backgroundColor = document.getElementById('backgroundColor').value;
    const fontColor = document.getElementById('fontColor').value;
    const linkColor = document.getElementById('linkColor').value;
    const hoverColor = document.getElementById('hoverColor').value;
    const fontFamily = document.getElementById('fontFamily').value;

    // Aplicação dos estilos ao preview na aba STYLE
    const stylePreviewContent = document.getElementById('stylePreviewContent');
    stylePreviewContent.style.backgroundColor = backgroundColor;
    stylePreviewContent.style.color = fontColor;
    stylePreviewContent.style.fontFamily = fontFamily;

    const companyListStyle = document.getElementById('companyListStyle');
    companyListStyle.style.color = fontColor;

    // Aplicação dos estilos aos links
    const companyLinks = document.querySelectorAll('.company-link');
    companyLinks.forEach(function(link) {
        link.style.color = linkColor;
    });

    // Aplicação do estilo de hover aos elementos de lista
    const companyListItems = document.querySelectorAll('.company-item-style');
    companyListItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            item.style.backgroundColor = hoverColor;
        });
        item.addEventListener('mouseleave', function() {
            item.style.backgroundColor = 'transparent';
        });
    });

    // Aplicação dos estilos ao preview na aba PAGE
    applyStylesToPagePreview();
});

// Event listener para iniciar na página PAGE
document.addEventListener('DOMContentLoaded', function() {
    showPage('page');
});

document.getElementById('deployButton').addEventListener('click', function() {
    const customDomainInput = document.getElementById('customDomain');
    const domainUserSpan = document.querySelector('.domain-user');

    // Atualiza o domínio exibido
    const customDomain = customDomainInput.value.trim();
    domainUserSpan.textContent = customDomain ? customDomain : 'user-name'; // Usa o valor customizado ou padrão

    // Limpa o input após salvar
    customDomainInput.value = '';
});

function showSettingsPage(page) {
    const domainContent = document.getElementById('settingsDomainContent');
    const billingContent = document.getElementById('settingsBillingContent');
    const domainNavItem = document.querySelector('.secondary-navbar .navbar-brand[href="#"][onclick="showSettingsPage(\'domain\')"]');
    const billingNavItem = document.querySelector('.secondary-navbar .navbar-brand[href="#"][onclick="showSettingsPage(\'billing\')"]');

    if (page === 'domain') {
        domainContent.classList.remove('d-none');
        billingContent.classList.add('d-none');
        domainNavItem.classList.add('active');
        billingNavItem.classList.remove('active');
    } else if (page === 'billing') {
        billingContent.classList.remove('d-none');
        domainContent.classList.add('d-none');
        billingNavItem.classList.add('active');
        domainNavItem.classList.remove('active');
    }
}

// Função para definir o plano atual
function setCurrentPlan(plan) {
    const currentPlanSpan = document.getElementById('currentPlan');
    currentPlanSpan.textContent = plan;
}

// Exemplo de uso para definir o plano (pode ser chamado a partir de uma API ou lógica de autenticação)
setCurrentPlan('Free'); // Altere 'Free' para o plano real do usuário