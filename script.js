document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.getElementById("registration-form");
    const slotsAvailable = document.getElementById("slots-available");
    const registeredTeams = document.getElementById("registered-teams");

    let availableSlots = localStorage.getItem("availableSlots") || 10;
    slotsAvailable.textContent = availableSlots;

    let registeredData = JSON.parse(localStorage.getItem("registeredData")) || [];

    updateRegisteredTeams();

    registrationForm.addEventListener("submit", function(event) {
        event.preventDefault();

        if (availableSlots > 0) {
            availableSlots--;
            localStorage.setItem("availableSlots", availableSlots);

            const formData = {
                teamName: document.getElementById("team-name").value,
                leaderName: document.getElementById("leader-name").value,
                member1Name: document.getElementById("member1-name").value,
                member2Name: document.getElementById("member2-name").value,
                member3Name: document.getElementById("member3-name").value,
                member4Name: document.getElementById("member4-name").value,
                reserveName: document.getElementById("reserve-name").value,
                contact: document.getElementById("contact").value
            };
            registeredData.push(formData);
            localStorage.setItem("registeredData", JSON.stringify(registeredData));

            const message = `Pendaftaran Tim MLBB:\n\n` +
                            `Nama Tim: ${formData.teamName}\n` +
                            `Nama Ketua: ${formData.leaderName}\n` +
                            `Anggota 1: ${formData.member1Name}\n` +
                            `Anggota 2: ${formData.member2Name}\n` +
                            `Anggota 3: ${formData.member3Name}\n` +
                            `Anggota 4: ${formData.member4Name}\n` +
                            `Cadangan: ${formData.reserveName}\n` +
                            `Kontak: ${formData.contact}\n` +
                            `Untuk bergabung ke grup WhatsApp, klik tautan berikut: https://chat.whatsapp.com/GAbk6EBZh8NAvgwyWtq7EK`; // Ganti dengan tautan grup WhatsApp yang sesuai

            const encodedMessage = encodeURIComponent(message);

            const adminWaURL = `https://wa.me/6281917252386?text=${encodedMessage}`; 
            window.open(adminWaURL, "_blank");

            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>Nama Tim:</strong> ${formData.teamName}<br>
                <strong>Nama Ketua:</strong> ${formData.leaderName}<br>
                <strong>Anggota:</strong> ${formData.member1Name}, ${formData.member2Name}, ${formData.member3Name}, ${formData.member4Name}<br>
                <strong>Cadangan:</strong> ${formData.reserveName}<br>
                <strong>Kontak:</strong> ${formData.contact}
            `;
            registeredTeams.appendChild(listItem);

            slotsAvailable.textContent = availableSlots;

            const groupInviteURL = `https://chat.whatsapp.com/GAbk6EBZh8NAvgwyWtq7EK`; 
            window.open(groupInviteURL, "_blank");

            registrationForm.reset(); 
        } else {
            alert("Slot pendaftaran sudah penuh!");
        }
    });

    function updateRegisteredTeams() {
        registeredData.forEach(function(formData) {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>Nama Tim:</strong> ${formData.teamName}<br>
                <strong>Nama Ketua:</strong> ${formData.leaderName}<br>
                <strong>Anggota:</strong> ${formData.member1Name}, ${formData.member2Name}, ${formData.member3Name}, ${formData.member4Name}<br>
                <strong>Cadangan:</strong> ${formData.reserveName}<br>
                <strong>Kontak:</strong> ${formData.contact}
            `;
            registeredTeams.appendChild(listItem);
        });
    }
});
