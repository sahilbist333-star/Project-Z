import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const exportToPDF = async (elementId: string, filename: string) => {
    const element = document.getElementById(elementId)
    if (!element) return

    try {
        // Clone element to apply export-specific styles if needed
        const canvas = await html2canvas(element, {
            scale: 2, // Higher scale for better quality
            useCORS: true,
            logging: false,
            backgroundColor: '#080808', // Match brand background
            windowWidth: 1200, // Fixed width for consistent layout
        })

        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width / 2, canvas.height / 2], // Match canvas dimensions at 1x
        })

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2)
        pdf.save(`${filename}.pdf`)
    } catch (error) {
        console.error('PDF Export failed:', error)
        throw error
    }
}
