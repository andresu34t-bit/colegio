/**
 * EDUGEST - Sistema de Generación de Informes
 * Módulo para generar informes individuales y consolidados en PDF
 */

// Importar jsPDF y autoTable (se cargan desde CDN en el HTML)
// window.jspdf y window.jspdf.autoTable

class InformesGenerator {
    constructor() {
        this.colegioInfo = this.getColegioInfo();
        this.logoBase64 = null; // Se cargará dinámicamente
    }

    /**
     * Obtener información del colegio desde localStorage
     */
    getColegioInfo() {
        const info = localStorage.getItem('informacionesGenerales');
        if (info) {
            return JSON.parse(info);
        }
        return {
            nombreColegio: 'Colegio Demo',
            rbd: '12345',
            director: 'Director Demo',
            año: '2026'
        };
    }

    /**
     * Generar informe individual por evento
     */
    async generarInformeEvento(eventoId) {
        const evento = this.getEventoById(eventoId);
        if (!evento) {
            alert('Evento no encontrado');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Configuración de colores según área
        const colores = this.getColoresArea(evento.area);
        
        // Header con logos
        await this.addHeader(doc, 'Informe de Evento PME');
        
        // Información del colegio
        this.addColegioInfo(doc, 30);
        
        // Línea separadora
        doc.setDrawColor(colores.primary);
        doc.setLineWidth(0.5);
        doc.line(20, 55, 190, 55);
        
        // Información del evento
        let yPos = 65;
        
        // Área
        doc.setFillColor(colores.light);
        doc.rect(20, yPos, 170, 10, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(colores.dark);
        doc.text('ÁREA DE GESTIÓN', 25, yPos + 7);
        
        yPos += 15;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(60, 60, 60);
        doc.text(`${evento.area}`, 25, yPos);
        
        // Subdimensión
        yPos += 10;
        doc.setFont('helvetica', 'bold');
        doc.text('Subdimensión:', 25, yPos);
        doc.setFont('helvetica', 'normal');
        doc.text(evento.subdimension || 'N/A', 70, yPos);
        
        // Objetivo Estratégico
        yPos += 10;
        doc.setFont('helvetica', 'bold');
        doc.text('Objetivo Estratégico:', 25, yPos);
        yPos += 7;
        doc.setFont('helvetica', 'normal');
        const objetivoLines = doc.splitTextToSize(evento.objetivoEstrategico || 'N/A', 160);
        doc.text(objetivoLines, 25, yPos);
        yPos += objetivoLines.length * 5 + 5;
        
        // Estrategia
        doc.setFont('helvetica', 'bold');
        doc.text('Estrategia:', 25, yPos);
        yPos += 7;
        doc.setFont('helvetica', 'normal');
        const estrategiaLines = doc.splitTextToSize(evento.estrategia || 'N/A', 160);
        doc.text(estrategiaLines, 25, yPos);
        yPos += estrategiaLines.length * 5 + 5;
        
        // Indicadores
        yPos += 5;
        doc.setFillColor(colores.light);
        doc.rect(20, yPos, 170, 10, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(colores.dark);
        doc.text('INDICADORES Y MÉTRICAS', 25, yPos + 7);
        
        yPos += 15;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        
        // Tabla de indicadores
        const indicadoresData = [
            ['N° de Eventos', evento.numeroEventos || '0'],
            ['% Logro del Objetivo', `${evento.porcentajeLogro || 0}%`],
            ['% Logro de la Meta', `${evento.porcentajeMeta || 0}%`],
            ['Fecha del Evento', evento.fecha || 'N/A'],
            ['Responsable', evento.responsable || 'N/A']
        ];
        
        doc.autoTable({
            startY: yPos,
            head: [['Indicador', 'Valor']],
            body: indicadoresData,
            theme: 'striped',
            headStyles: {
                fillColor: colores.primary,
                textColor: 255,
                fontStyle: 'bold'
            },
            margin: { left: 25, right: 25 },
            styles: {
                fontSize: 10,
                cellPadding: 5
            }
        });
        
        yPos = doc.lastAutoTable.finalY + 15;
        
        // Descripción del evento
        if (yPos > 240) {
            doc.addPage();
            yPos = 30;
        }
        
        doc.setFillColor(colores.light);
        doc.rect(20, yPos, 170, 10, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(colores.dark);
        doc.text('DESCRIPCIÓN DEL EVENTO', 25, yPos + 7);
        
        yPos += 15;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        const descripcionLines = doc.splitTextToSize(evento.descripcion || 'Sin descripción', 160);
        doc.text(descripcionLines, 25, yPos);
        
        // Footer
        this.addFooter(doc);
        
        // Guardar PDF
        const fileName = `informe_evento_${evento.area}_${new Date().getTime()}.pdf`;
        doc.save(fileName);
    }

    /**
     * Generar informe general consolidado
     */
    async generarInformeGeneral(filtros = {}) {
        const eventos = this.getEventos(filtros);
        const estadisticas = this.calcularEstadisticas(eventos);
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Header
        await this.addHeader(doc, 'Informe General PME');
        
        // Información del colegio
        this.addColegioInfo(doc, 30);
        
        // Línea separadora
        doc.setDrawColor(59, 130, 246);
        doc.setLineWidth(0.5);
        doc.line(20, 55, 190, 55);
        
        // Resumen ejecutivo
        let yPos = 65;
        doc.setFillColor(239, 246, 255);
        doc.rect(20, yPos, 170, 10, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(30, 64, 175);
        doc.text('RESUMEN EJECUTIVO', 25, yPos + 7);
        
        yPos += 20;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(60, 60, 60);
        
        const resumenData = [
            ['Total de Eventos Registrados', estadisticas.totalEventos.toString()],
            ['Promedio de Logro General', `${estadisticas.promedioLogro}%`],
            ['Áreas Activas', `${estadisticas.areasActivas} de 4`],
            ['Docentes Participantes', estadisticas.totalDocentes.toString()],
            ['Período', filtros.mes || 'Todo el año 2026']
        ];
        
        doc.autoTable({
            startY: yPos,
            body: resumenData,
            theme: 'plain',
            styles: {
                fontSize: 11,
                cellPadding: 5
            },
            columnStyles: {
                0: { fontStyle: 'bold', cellWidth: 80 },
                1: { cellWidth: 90 }
            }
        });
        
        yPos = doc.lastAutoTable.finalY + 15;
        
        // Resumen por área
        doc.setFillColor(239, 246, 255);
        doc.rect(20, yPos, 170, 10, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(30, 64, 175);
        doc.text('RESUMEN POR ÁREA', 25, yPos + 7);
        
        yPos += 15;
        
        const areasData = [];
        ['Currículum', 'Liderazgo', 'Convivencia', 'Recursos'].forEach(area => {
            const stats = estadisticas.porArea[area] || { eventos: 0, logro: 0, meta: 0 };
            areasData.push([
                area,
                stats.eventos.toString(),
                `${stats.logro}%`,
                `${stats.meta}%`
            ]);
        });
        
        doc.autoTable({
            startY: yPos,
            head: [['Área', 'Eventos', '% Logro', '% Meta']],
            body: areasData,
            theme: 'striped',
            headStyles: {
                fillColor: [59, 130, 246],
                textColor: 255,
                fontStyle: 'bold'
            },
            margin: { left: 25, right: 25 },
            styles: {
                fontSize: 10,
                cellPadding: 5,
                halign: 'center'
            },
            columnStyles: {
                0: { halign: 'left' }
            }
        });
        
        // Nueva página para gráficos
        doc.addPage();
        yPos = 30;
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(30, 64, 175);
        doc.text('ANÁLISIS GRÁFICO', 105, yPos, { align: 'center' });
        
        yPos += 15;
        
        // Generar gráficos
        await this.addGraficos(doc, yPos, estadisticas);
        
        // Nueva página para avance mensual
        doc.addPage();
        yPos = 30;
        
        doc.setFillColor(239, 246, 255);
        doc.rect(20, yPos, 170, 10, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(30, 64, 175);
        doc.text('AVANCE MENSUAL', 25, yPos + 7);
        
        yPos += 15;
        
        const avanceMensual = this.calcularAvanceMensual(eventos);
        const mesesData = [];
        Object.keys(avanceMensual).forEach(mes => {
            mesesData.push([
                mes,
                avanceMensual[mes].eventos.toString(),
                `${avanceMensual[mes].logro}%`
            ]);
        });
        
        doc.autoTable({
            startY: yPos,
            head: [['Mes', 'Eventos', '% Logro Promedio']],
            body: mesesData,
            theme: 'striped',
            headStyles: {
                fillColor: [59, 130, 246],
                textColor: 255,
                fontStyle: 'bold'
            },
            margin: { left: 25, right: 25 },
            styles: {
                fontSize: 10,
                cellPadding: 5,
                halign: 'center'
            },
            columnStyles: {
                0: { halign: 'left' }
            }
        });
        
        yPos = doc.lastAutoTable.finalY + 15;
        
        // Rendimiento por docente
        if (yPos > 200) {
            doc.addPage();
            yPos = 30;
        }
        
        doc.setFillColor(239, 246, 255);
        doc.rect(20, yPos, 170, 10, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(30, 64, 175);
        doc.text('RENDIMIENTO POR DOCENTE', 25, yPos + 7);
        
        yPos += 15;
        
        const docentesStats = this.calcularRendimientoDocentes(eventos);
        const docentesData = [];
        Object.keys(docentesStats).slice(0, 10).forEach(docente => {
            const stats = docentesStats[docente];
            docentesData.push([
                docente,
                stats.eventos.toString(),
                `${stats.logroPromedio}%`
            ]);
        });
        
        doc.autoTable({
            startY: yPos,
            head: [['Docente', 'Eventos', '% Logro Promedio']],
            body: docentesData,
            theme: 'striped',
            headStyles: {
                fillColor: [59, 130, 246],
                textColor: 255,
                fontStyle: 'bold'
            },
            margin: { left: 25, right: 25 },
            styles: {
                fontSize: 10,
                cellPadding: 5,
                halign: 'center'
            },
            columnStyles: {
                0: { halign: 'left' }
            }
        });
        
        // Footer en todas las páginas
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            this.addFooter(doc, i, pageCount);
        }
        
        // Guardar PDF
        const fileName = `informe_general_${this.colegioInfo.nombreColegio.replace(/\s/g, '_')}_${new Date().getTime()}.pdf`;
        doc.save(fileName);
    }

    /**
     * Agregar header con logos
     */
    async addHeader(doc, titulo) {
        // Logo EDUGEST (derecha)
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(59, 130, 246);
        doc.text('EDUGEST', 170, 15);
        
        // Título
        doc.setFontSize(14);
        doc.setTextColor(60, 60, 60);
        doc.text(titulo, 20, 15);
        
        // Fecha de generación
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(120, 120, 120);
        const fecha = new Date().toLocaleDateString('es-CL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        doc.text(`Generado: ${fecha}`, 20, 22);
    }

    /**
     * Agregar información del colegio
     */
    addColegioInfo(doc, yPos) {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(60, 60, 60);
        doc.text(this.colegioInfo.nombreColegio, 20, yPos);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(120, 120, 120);
        doc.text(`RBD: ${this.colegioInfo.rbd} | Director: ${this.colegioInfo.director} | Año: ${this.colegioInfo.año}`, 20, yPos + 5);
    }

    /**
     * Agregar footer
     */
    addFooter(doc, pageNum = 1, totalPages = 1) {
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(150, 150, 150);
        doc.text(`Página ${pageNum} de ${totalPages}`, 105, pageHeight - 10, { align: 'center' });
        doc.text('EDUGEST - Sistema de Gestión Educativa', 20, pageHeight - 10);
    }

    /**
     * Obtener colores según área
     */
    getColoresArea(area) {
        const coloresMap = {
            'Currículum': { primary: [59, 130, 246], light: [239, 246, 255], dark: [30, 64, 175] },
            'Liderazgo': { primary: [168, 85, 247], light: [250, 245, 255], dark: [107, 33, 168] },
            'Convivencia': { primary: [34, 197, 94], light: [240, 253, 244], dark: [21, 128, 61] },
            'Recursos': { primary: [245, 158, 11], light: [255, 251, 235], dark: [180, 83, 9] }
        };
        return coloresMap[area] || coloresMap['Currículum'];
    }

    /**
     * Agregar gráficos al PDF
     */
    async addGraficos(doc, yPos, estadisticas) {
        // Crear canvas temporal para gráficos
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');
        
        // Gráfico de barras - Eventos por área
        const chart1 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Currículum', 'Liderazgo', 'Convivencia', 'Recursos'],
                datasets: [{
                    label: 'Eventos',
                    data: [
                        estadisticas.porArea['Currículum']?.eventos || 0,
                        estadisticas.porArea['Liderazgo']?.eventos || 0,
                        estadisticas.porArea['Convivencia']?.eventos || 0,
                        estadisticas.porArea['Recursos']?.eventos || 0
                    ],
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(168, 85, 247, 0.8)',
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(245, 158, 11, 0.8)'
                    ]
                }]
            },
            options: {
                responsive: false,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Eventos por Área'
                    }
                }
            }
        });
        
        // Esperar a que se renderice
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Agregar al PDF
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 20, yPos, 170, 100);
        
        // Limpiar
        chart1.destroy();
    }

    /**
     * Obtener evento por ID
     */
    getEventoById(id) {
        const eventos = JSON.parse(localStorage.getItem('eventos') || '[]');
        return eventos.find(e => e.id === id);
    }

    /**
     * Obtener todos los eventos con filtros
     */
    getEventos(filtros = {}) {
        let eventos = JSON.parse(localStorage.getItem('eventos') || '[]');
        
        if (filtros.area) {
            eventos = eventos.filter(e => e.area === filtros.area);
        }
        
        if (filtros.mes) {
            eventos = eventos.filter(e => e.mes === filtros.mes);
        }
        
        return eventos;
    }

    /**
     * Calcular estadísticas generales
     */
    calcularEstadisticas(eventos) {
        const stats = {
            totalEventos: eventos.length,
            promedioLogro: 0,
            areasActivas: 0,
            totalDocentes: 0,
            porArea: {}
        };
        
        if (eventos.length === 0) return stats;
        
        // Calcular por área
        const areas = ['Currículum', 'Liderazgo', 'Convivencia', 'Recursos'];
        areas.forEach(area => {
            const eventosArea = eventos.filter(e => e.area === area);
            if (eventosArea.length > 0) {
                stats.areasActivas++;
                const logroPromedio = eventosArea.reduce((sum, e) => sum + (parseFloat(e.porcentajeLogro) || 0), 0) / eventosArea.length;
                const metaPromedio = eventosArea.reduce((sum, e) => sum + (parseFloat(e.porcentajeMeta) || 0), 0) / eventosArea.length;
                
                stats.porArea[area] = {
                    eventos: eventosArea.length,
                    logro: Math.round(logroPromedio),
                    meta: Math.round(metaPromedio)
                };
            }
        });
        
        // Promedio general
        stats.promedioLogro = Math.round(
            eventos.reduce((sum, e) => sum + (parseFloat(e.porcentajeLogro) || 0), 0) / eventos.length
        );
        
        // Docentes únicos
        const docentes = new Set(eventos.map(e => e.responsable).filter(Boolean));
        stats.totalDocentes = docentes.size;
        
        return stats;
    }

    /**
     * Calcular avance mensual
     */
    calcularAvanceMensual(eventos) {
        const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 
                       'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
        
        const avance = {};
        meses.forEach(mes => {
            const eventosMes = eventos.filter(e => e.mes === mes);
            if (eventosMes.length > 0) {
                avance[mes] = {
                    eventos: eventosMes.length,
                    logro: Math.round(
                        eventosMes.reduce((sum, e) => sum + (parseFloat(e.porcentajeLogro) || 0), 0) / eventosMes.length
                    )
                };
            }
        });
        
        return avance;
    }

    /**
     * Calcular rendimiento por docente
     */
    calcularRendimientoDocentes(eventos) {
        const docentes = {};
        
        eventos.forEach(evento => {
            const responsable = evento.responsable || 'Sin asignar';
            if (!docentes[responsable]) {
                docentes[responsable] = {
                    eventos: 0,
                    logroTotal: 0
                };
            }
            docentes[responsable].eventos++;
            docentes[responsable].logroTotal += parseFloat(evento.porcentajeLogro) || 0;
        });
        
        // Calcular promedios
        Object.keys(docentes).forEach(docente => {
            docentes[docente].logroPromedio = Math.round(
                docentes[docente].logroTotal / docentes[docente].eventos
            );
        });
        
        return docentes;
    }
}

// Exportar para uso global
window.InformesGenerator = InformesGenerator;
