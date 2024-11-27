// Konfigurasi Validasi
const validationConfig = {
    nama: {
        required: true,
        minLength: 3,
        errorMessage: 'Nama harus diisi minimal 3 karakter'
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: 'Format email tidak valid'
    },
    telepon: {
        required: true,
        pattern: /^[0-9]{10,13}$/,
        errorMessage: 'Nomor telepon harus 10-13 digit'
    },
    alamat: {
        required: true,
        minLength: 10,
        errorMessage: 'Alamat harus diisi minimal 10 karakter'
    },
    tanggal_lahir: {
        required: true,
        errorMessage: 'Tanggal lahir harus diisi'
    },
    jenis_kelamin: {
        required: true,
        errorMessage: 'Jenis kelamin harus dipilih'
    },
    level: {
        required: true,
        errorMessage: 'Level kursus harus dipilih'
    },
    jadwal: {
        required: true,
        errorMessage: 'Jadwal kursus harus dipilih'
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    setupFormValidation(form);
    setupInputListeners();
});

// Setup Validasi Form
function setupFormValidation(form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        if (validateForm()) {
            handleFormSubmission(form);
        }
    });
}

// Setup Input Listeners
function setupInputListeners() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            clearError(input);
        });
    });
}

// Validasi Form
function validateForm() {
    let isValid = true;
    const fields = document.querySelectorAll('[name]');
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validasi Field Individual
function validateField(field) {
    const config = validationConfig[field.name];
    if (!config) return true;

    let isValid = true;
    const value = field.value.trim();

    // Validasi Required
    if (config.required && !value) {
        showError(field, config.errorMessage);
        isValid = false;
    }

    // Validasi Minimum Length
    if (isValid && config.minLength && value.length < config.minLength) {
        showError(field, config.errorMessage);
        isValid = false;
    }

    // Validasi Pattern
    if (isValid && config.pattern && !config.pattern.test(value)) {
        showError(field, config.errorMessage);
        isValid = false;
    }

    return isValid;
}

// Tampilkan Error
function showError(field, message) {
    const errorElement = field.parentElement.querySelector('[data-error]');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        field.classList.add('error');
    }
}

// Hapus Error
function clearError(field) {
    const errorElement = field.parentElement.querySelector('[data-error]');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        field.classList.remove('error');
    }
}

// Handle Form Submission
function handleFormSubmission(form) {
    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Simulasi pengiriman data ke server
    console.log('Data yang akan dikirim:', data);
}