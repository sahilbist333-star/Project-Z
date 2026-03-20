import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const exportToPDF = async (elementId: string = 'report-capture', filename: string) => {
    const element = document.getElementById(elementId)
    if (!element) return

    // Small delay to ensure any animations/fonts are settled
    await new Promise(r => setTimeout(r, 500))

    try {
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false,
            backgroundColor: '#080808',
            windowWidth: 1400,
            onclone: (clonedDoc) => {
                const el = clonedDoc.getElementById(elementId)
                if (el) {
                    el.style.opacity = '1'
                    el.style.visibility = 'visible'
                    // Force all animations to end/be static
                    const transitions = el.querySelectorAll('*')
                    transitions.forEach((child) => {
                        if (child instanceof HTMLElement) {
                            child.style.opacity = '1'
                            child.style.visibility = 'visible'
                            child.style.transform = 'none'
                            child.style.transition = 'none'
                            child.style.animation = 'none'
                        }
                    })
                }
            }
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
