import { createDbConnection } from '../config/conn.mjs';

export const intentNPacientes = async (cantidad, orden) => {
    try {
        const db = await createDbConnection();
        const [rows] = await db.execute(`SELECT 
            CONCAT(p.first_name, ' ', p.last_name) AS patient, 
            p.allergies, 
            CONCAT(d.first_name, ' ', d.last_name) AS doctor,
            DATE_FORMAT(a.admission_date, '%d/%m/%Y') AS admission_date
        FROM admission a
        JOIN patient p ON a.patient_id = p.id
        JOIN doctor d ON a.attending_doctor_id = d.id
        WHERE p.allergies IS NOT NULL
        ORDER BY a.admission_date ${ ['primera', 'primero', 'primeras', 'primeros'].includes(orden.toLowerCase()) ? 'ASC' : 'DESC' }
        LIMIT ${cantidad};`);
        return [
            {
                contentType: "PlainText",
                content: `<table class="message-table">
                <thead><tr><th>Paciente</th><th>Alergia</th><th>Médico que Atendió</th><th>Fecha</th></tr></thead>
                <tbody>${rows.map(row => `<tr><td>${row.patient}</td><td>${row.allergies}</td><td>${row.doctor}</td><td>${row.admission_date}</td>`).join('')}</tr></table>`
            }
        ];
    } catch (error) {
        return {status: 500, message: error.message}
    }
}