/**
 * EDUGEST - Sistema de Gestión de Documentos
 * Subida, almacenamiento y gestión de archivos
 */

// Tipos de documentos permitidos
const DOCUMENT_TYPES = {
    EVIDENCE: 'evidence',
    REPORT: 'report',
    IMAGE: 'image',
    PRESENTATION: 'presentation',
    OTHER: 'other'
};

// Extensiones permitidas
const ALLOWED_EXTENSIONS = {
    [DOCUMENT_TYPES.EVIDENCE]: ['.pdf', '.doc', '.docx', '.txt'],
    [DOCUMENT_TYPES.REPORT]: ['.pdf', '.doc', '.docx', '.xls', '.xlsx'],
    [DOCUMENT_TYPES.IMAGE]: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    [DOCUMENT_TYPES.PRESENTATION]: ['.ppt', '.pptx', '.pdf'],
    [DOCUMENT_TYPES.OTHER]: ['.pdf', '.doc', '.docx', '.txt', '.zip']
};

// Tamaño máximo por archivo (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Almacenamiento de documentos
let documents = [];

/**
 * Inicializar sistema de documentos
 */
function initDocuments() {
    loadDocuments();
}

/**
 * Cargar documentos desde localStorage
 */
function loadDocuments() {
    const user = window.EdugestRoles?.getCurrentUser();
    if (!user) return;
    
    const key = `edugest_documents_${user.schoolId}`;
    const stored = localStorage.getItem(key);
    
    if (stored) {
        try {
            documents = JSON.parse(stored);
        } catch (e) {
            documents = [];
        }
    }
}

/**
 * Guardar documentos en localStorage
 */
function saveDocuments() {
    const user = window.EdugestRoles?.getCurrentUser();
    if (!user) return;
    
    const key = `edugest_documents_${user.schoolId}`;
    localStorage.setItem(key, JSON.stringify(documents));
}

/**
 * Validar archivo
 */
function validateFile(file, type) {
    // Validar tamaño
    if (file.size > MAX_FILE_SIZE) {
        return {
            valid: false,
            error: `El archivo es muy grande. Máximo ${MAX_FILE_SIZE / 1024 / 1024}MB`
        };
    }
    
    // Validar extensión
    const extension = '.' + file.name.split('.').pop().toLowerCase();
    const allowedExtensions = ALLOWED_EXTENSIONS[type] || [];
    
    if (!allowedExtensions.includes(extension)) {
        return {
            valid: false,
            error: `Extensión no permitida. Permitidas: ${allowedExtensions.join(', ')}`
        };
    }
    
    return { valid: true };
}

/**
 * Subir documento (simulado con Base64)
 */
async function uploadDocument(file, metadata = {}) {
    const user = window.EdugestRoles?.getCurrentUser();
    if (!user) {
        throw new Error('Usuario no autenticado');
    }
    
    // Validar archivo
    const validation = validateFile(file, metadata.type || DOCUMENT_TYPES.OTHER);
    if (!validation.valid) {
        throw new Error(validation.error);
    }
    
    // Convertir a Base64 (en producción se subiría a un servidor)
    const base64 = await fileToBase64(file);
    
    // Crear documento
    const document = {
        id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        type: metadata.type || DOCUMENT_TYPES.OTHER,
        size: file.size,
        mimeType: file.type,
        data: base64,
        uploadedBy: user.email,
        uploadedByName: user.name,
        schoolId: user.schoolId,
        eventId: metadata.eventId || null,
        category: metadata.category || 'general',
        description: metadata.description || '',
        createdAt: new Date().toISOString()
    };
    
    documents.unshift(document);
    saveDocuments();
    
    // Crear notificación
    if (window.EdugestNotifications) {
        window.EdugestNotifications.createNotification(
            'document_uploaded',
            'Documento subido',
            `${user.name} subió: ${file.name}`
        );
    }
    
    return document;
}

/**
 * Convertir archivo a Base64
 */
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * Obtener documento por ID
 */
function getDocumentById(documentId) {
    return documents.find(d => d.id === documentId);
}

/**
 * Obtener documentos por evento
 */
function getDocumentsByEvent(eventId) {
    return documents.filter(d => d.eventId === eventId);
}

/**
 * Obtener documentos por tipo
 */
function getDocumentsByType(type) {
    return documents.filter(d => d.type === type);
}

/**
 * Obtener todos los documentos
 */
function getAllDocuments() {
    const user = window.EdugestRoles?.getCurrentUser();
    if (!user) return [];
    
    // Filtrar por colegio
    return window.EdugestSchools?.filterBySchool(documents) || documents;
}

/**
 * Eliminar documento
 */
function deleteDocument(documentId) {
    const index = documents.findIndex(d => d.id === documentId);
    
    if (index !== -1) {
        documents.splice(index, 1);
        saveDocuments();
        return true;
    }
    
    return false;
}

/**
 * Descargar documento
 */
function downloadDocument(documentId) {
    const document = getDocumentById(documentId);
    if (!document) return;
    
    // Crear link de descarga
    const link = document.createElement('a');
    link.href = document.data;
    link.download = document.name;
    link.click();
}

/**
 * Formatear tamaño de archivo
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Obtener icono según tipo de archivo
 */
function getFileIcon(filename) {
    const extension = filename.split('.').pop().toLowerCase();
    
    const icons = {
        pdf: '📄',
        doc: '📝',
        docx: '📝',
        xls: '📊',
        xlsx: '📊',
        ppt: '📊',
        pptx: '📊',
        jpg: '🖼️',
        jpeg: '🖼️',
        png: '🖼️',
        gif: '🖼️',
        zip: '📦',
        txt: '📃'
    };
    
    return icons[extension] || '📄';
}

/**
 * Renderizar lista de documentos
 */
function renderDocumentList(containerId, filters = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let docs = getAllDocuments();
    
    // Aplicar filtros
    if (filters.type) {
        docs = docs.filter(d => d.type === filters.type);
    }
    if (filters.eventId) {
        docs = docs.filter(d => d.eventId === filters.eventId);
    }
    if (filters.search) {
        const search = filters.search.toLowerCase();
        docs = docs.filter(d => 
            d.name.toLowerCase().includes(search) ||
            d.description.toLowerCase().includes(search)
        );
    }
    
    if (docs.length === 0) {
        container.innerHTML = `
            <div class="document-empty">
                <div class="document-empty-icon">📁</div>
                <div class="document-empty-text">No hay documentos</div>
            </div>
        `;
        return;
    }
    
    const html = docs.map(doc => `
        <div class="document-item" data-id="${doc.id}">
            <div class="document-icon">${getFileIcon(doc.name)}</div>
            <div class="document-info">
                <div class="document-name">${doc.name}</div>
                <div class="document-meta">
                    ${formatFileSize(doc.size)} • ${new Date(doc.createdAt).toLocaleDateString('es-CL')}
                    ${doc.uploadedByName ? ` • ${doc.uploadedByName}` : ''}
                </div>
                ${doc.description ? `<div class="document-description">${doc.description}</div>` : ''}
            </div>
            <div class="document-actions">
                <button class="btn-icon" onclick="window.EdugestDocuments.downloadDocument('${doc.id}')" title="Descargar">⬇️</button>
                <button class="btn-icon" onclick="window.EdugestDocuments.deleteDocument('${doc.id}'); window.location.reload();" title="Eliminar">🗑️</button>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

/**
 * Crear input de subida de archivos
 */
function createFileInput(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const html = `
        <div class="file-upload-area">
            <input type="file" id="fileInput" class="file-input" accept="${getAcceptString(options.type)}" ${options.multiple ? 'multiple' : ''}>
            <label for="fileInput" class="file-upload-label">
                <div class="file-upload-icon">📁</div>
                <div class="file-upload-text">
                    <div>Haz clic o arrastra archivos aquí</div>
                    <div class="file-upload-hint">Máximo ${MAX_FILE_SIZE / 1024 / 1024}MB por archivo</div>
                </div>
            </label>
        </div>
        <div id="fileList" class="file-list"></div>
    `;
    
    container.innerHTML = html;
    
    // Agregar event listeners
    const input = document.getElementById('fileInput');
    input.addEventListener('change', (e) => handleFileSelect(e, options));
}

/**
 * Obtener string de extensiones aceptadas
 */
function getAcceptString(type) {
    if (!type) return '*';
    const extensions = ALLOWED_EXTENSIONS[type] || [];
    return extensions.join(',');
}

/**
 * Manejar selección de archivos
 */
async function handleFileSelect(event, options = {}) {
    const files = Array.from(event.target.files);
    const fileList = document.getElementById('fileList');
    
    if (!fileList) return;
    
    fileList.innerHTML = '<div class="loading">Subiendo archivos...</div>';
    
    try {
        for (const file of files) {
            await uploadDocument(file, options);
        }
        
        fileList.innerHTML = '<div class="success">✓ Archivos subidos correctamente</div>';
        
        // Recargar lista si existe
        if (options.listContainerId) {
            renderDocumentList(options.listContainerId);
        }
        
        setTimeout(() => {
            fileList.innerHTML = '';
            event.target.value = '';
        }, 3000);
        
    } catch (error) {
        fileList.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
}

// Exportar para uso global
window.EdugestDocuments = {
    DOCUMENT_TYPES,
    initDocuments,
    uploadDocument,
    getDocumentById,
    getDocumentsByEvent,
    getDocumentsByType,
    getAllDocuments,
    deleteDocument,
    downloadDocument,
    formatFileSize,
    getFileIcon,
    renderDocumentList,
    createFileInput
};

// Auto-inicializar
document.addEventListener('DOMContentLoaded', () => {
    const user = window.EdugestRoles?.getCurrentUser();
    if (user) {
        initDocuments();
    }
});
