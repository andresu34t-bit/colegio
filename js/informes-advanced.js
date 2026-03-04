/**
 * EDUGEST - Sistema Avanzado de Informes
 * Integración con multi-colegio y datos completos
 */

class InformesAdvanced extends InformesGenerator {
    constructor() {
        super();
        this.currentSchool = this.getCurrentSchool();
    }

    /**
     * Obtener colegio actual
     */
    getCurrentSchool() {
        const user = window.EdugestRoles?.getCurrentUser();
        if (!user) return null;
        return window.EdugestSchools?.getCurrentSchool();
    }

    /**
     * Obtener eventos del colegio actual
     */
    getEventos(filtros = {}) {
        const user = window.EdugestRoles?.getCurrentUser();
        if (!user) return [];

        // Obtener eventos del colegio actual
        const key = `edugest_events_${user.schoolId}`;
        let eventos = JSON.parse(localStorage.getItem(key) || '[]');

        // También intentar con formato legacy
        if (eventos.length === 0) {
            eventos = JSON.parse(localStorage.getItem('eventos') || '[]');
        }

        // Aplicar filtros
        if (filtros.area && filtros.area !== 'TODAS') {
            eventos = eventos.filter(e => e.area === filtros.area);
        }

        if (filtros.mes) {
            eventos = eventos.filter(e => e.mes === filtros.mes);
        }

        return eventos;
    }

    /**
     * Generar informe por área con datos completos
     */
    async generarInformeArea(area) {
        const eventos = this.getEventos({ area: area === 'TODAS' ? null : area });
        
        if (eventos.length === 0) {
            alert('No hay eventos registrados para generar el informe');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Header
        await this.addHeader(doc, area === 'TODAS' ? 'Informe Consolidado PME' : `Informe ${area}`);

        // Información del colegio
        this.addColegioInfo(doc, 30);

        // Línea separadora
        const colores = this.getColoresArea(area === 'TODAS' ? 'Currículum' : area);
        doc.setDrawColor(colores.primary);
        doc.setLineWidth(0.5);
        doc.line(20, 55, 190, 55);

        // Estadísticas
        const stats = this.calcularEstadisticas(eventos);
        let yPos = 65;

        // Resumen ejecutivo
        doc.setFillColor(colores.light);
        doc.rect(20, yPos, 170, 10, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(colores.dark);
        doc.text('RESUMEN EJECUTIVO', 25, yPos + 7);

        yPos += 15;

        const resumenData = [
            ['Total de Eventos', stats.totalEventos.toString()],
            ['Promedio de Logro', `${stats.promedioLogro}%`],
            ['Docentes Participantes', stats.totalDocentes.toString()],
            ['Período', '2026']
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

        // Si es consolidado, mostrar por área
        if (area === 'TODAS') {
            doc.setFillColor(colores.light);
            doc.rect(20, yPos, 170, 10, 'F');
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.setTextColor(colores.dark);
            doc.text('RESUMEN POR ÁREA', 25, yPos + 7);

            yPos += 15;

            const areasData = [];
            ['Currículum', 'Liderazgo', 'Convivencia', 'Recursos'].forEach(areaName => {
                const areaStats = stats.porArea[areaName] || { eventos: 0, logro: 0, meta: 0 };
                areasData.push([
                    areaName,
                    areaStats.eventos.toString(),
                    `${areaStats.logro}%`,
                    `${areaStats.meta}%`
                ]);
            });

            doc.autoTable({
                startY: yPos,
                head: [['Área', 'Eventos', '% Logro', '% Meta']],
                body: areasData,
                theme: 'striped',
                headStyles: {
                    fillColor: colores.primary,
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
        }

        // Nueva página para detalle de eventos
        doc.addPage();
        yPos = 30;

        doc.setFillColor(colores.light);
        doc.rect(20, yPos, 170, 10, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(colores.dark);
        doc.text('DETALLE DE EVENTOS', 25, yPos + 7);

        yPos += 15;

        // Tabla de eventos (primeros 20)
        const eventosData = eventos.slice(0, 20).map(e => [
            e.mes || 'N/A',
            e.area || 'N/A',
            (e.actividad || e.estrategia || 'N/A').substring(0, 40) + '...',
            e.numeroEventos?.toString() || '1',
            `${e.porcentajeLogro || 0}%`,
            e.responsable || 'N/A'
        ]);

        doc.autoTable({
            startY: yPos,
            head: [['Mes', 'Área', 'Actividad', 'N°', '% Logro', 'Responsable']],
            body: eventosData,
            theme: 'striped',
            headStyles: {
                fillColor: colores.primary,
                textColor: 255,
                fontStyle: 'bold',
                fontSize: 9
            },
            margin: { left: 15, right: 15 },
            styles: {
                fontSize: 8,
                cellPadding: 3
            },
            columnStyles: {
                2: { cellWidth: 60 }
            }
        });

        // Avance mensual
        doc.addPage();
        yPos = 30;

        doc.setFillColor(colores.light);
        doc.rect(20, yPos, 170, 10, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(colores.dark);
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
                fillColor: colores.primary,
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
        const schoolName = this.currentSchool?.name || 'Colegio';
        const areaName = area === 'TODAS' ? 'Consolidado' : area;
        const fileName = `Informe_${areaName}_${schoolName.replace(/\s/g, '_')}_${new Date().getTime()}.pdf`;
        doc.save(fileName);
    }

    /**
     * Calcular estadísticas mejoradas
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
}

// Exportar para uso global
window.InformesAdvanced = InformesAdvanced;
