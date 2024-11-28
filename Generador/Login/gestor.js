// Función para cargar contraseñas
function loadPasswords() {
    fetch('get_passwords.php')
        .then(response => response.json())
        .then(passwords => {
            const tableBody = document.getElementById('passwordTable').querySelector('tbody');
            tableBody.innerHTML = ''; // Limpiar tabla

            passwords.forEach(password => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${password.service_name}</td>
                    <td>${password.username}</td>
                    <td>
                        <input type="password" value="${password.decrypted_password}" class="password-field" readonly>
                        <button class="toggle-password" onclick="togglePassword(this)">👁</button>
                    </td>
                    <td>
                    <button onclick="editPassword(${password.id}, '${password.service_name}', '${password.username}', '${password.decrypted_password}')">Modificar</button>
                        <button onclick="deletePassword(${password.id})">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error al cargar contraseñas:', error));
}

// Función para alternar la visibilidad de la contraseña
function togglePassword(button) {
    const passwordField = button.previousElementSibling;
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        button.textContent = '🙈'; // Cambiar ícono
    } else {
        passwordField.type = 'password';
        button.textContent = '👁'; // Cambiar ícono
    }
}

function addPassword() {
    const service = document.getElementById('service').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!service || !username || !password) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    fetch('add_password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service, username, password }),
    })
        .then(response => {
            // Verificar que la respuesta sea JSON
            return response.json();
        })
        .then(result => {
            if (result.success) {
                alert('Contraseña añadida con éxito.');
                loadPasswords(); // Recargar las contraseñas
            } else {
                alert('Error al añadir la contraseña: ' + result.message);
            }
        })
        .catch(error => {
            console.error('Error al añadir contraseña:', error);
            alert('Hubo un error al procesar la solicitud.');
        });
}

// Función para eliminar una contraseña
function deletePassword(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta contraseña?')) return;

    fetch('delete_password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Contraseña eliminada con éxito.');
                loadPasswords();
            } else {
                alert('Error al eliminar la contraseña: ' + result.message);
            }
        })
        .catch(error => console.error('Error al eliminar contraseña:', error));
}

// Función para abrir el formulario de edición
function editPassword(id, service, username, decryptedPassword) {
    const editForm = `
        <div id="editModal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal()">&times;</span>
                <h2>Modificar Contraseña</h2>
                <form id="editPasswordForm">
                    <label for="editService">Servicio:</label>
                    <input type="text" id="editService" value="${service}" required>
                    
                    <label for="editUsername">Usuario:</label>
                    <input type="text" id="editUsername" value="${username}" required>
                    
                    <label for="editPassword">Nueva Contraseña:</label>
                    <input type="text" id="editPassword" value="${decryptedPassword}" required>
                    
                    <button type="button" onclick="savePassword(${id})">Guardar Cambios</button>
                </form>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', editForm);
    document.getElementById('editModal').style.display = 'block';
}

// Función para cerrar el formulario de edición
function closeModal() {
    const modal = document.getElementById('editModal');
    if (modal) modal.remove();
}

// Función para guardar los cambios de una contraseña
function savePassword(id) {
    const service = document.getElementById('editService').value.trim();
    const username = document.getElementById('editUsername').value.trim();
    const password = document.getElementById('editPassword').value.trim();

    if (!service || !username || !password) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    fetch('update_password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, service, username, password }),
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Contraseña modificada con éxito.');
                loadPasswords(); // Recargar la lista de contraseñas
                closeModal(); // Cerrar el modal
            } else {
                alert('Error al modificar la contraseña.');
            }
        })
        .catch(error => console.error('Error al modificar contraseña:', error));
}

// Cargar contraseñas al iniciar la página
document.addEventListener('DOMContentLoaded', loadPasswords);
