<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liste des Utilisateurs</title>
    <link rel="stylesheet" href="style.css">
   
</head>
<body>

    <h1>Tableau des Utilisateurs</h1>

    <button id="updateButton">Update</button>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody id="userTableBody">
            </tbody>
    </table>


    <script>
        document.addEventListener('DOMContentLoaded', function() {

            const updateBtn = document.getElementById('updateButton');
            const tableBody = document.getElementById('userTableBody');

            async function fetchAndUpdateUsers() {
                
                tableBody.innerHTML = '<tr><td colspan="4">Chargement...</td></tr>';

                try {
                    const response = await fetch('users.php');
                    if (!response.ok) {
                        throw new Error(`Erreur HTTP: ${response.status}`);
                    }
                    const users = await response.json();
                    tableBody.innerHTML = '';

                    users.forEach(user => {
                        const row = document.createElement('tr');
                        
                        row.innerHTML = `
                            <td>${user.id}</td>
                            <td>${user.nom}</td>
                            <td>${user.prenom}</td>
                            <td>${user.email}</td>
                        `;
                        
                        tableBody.appendChild(row);
                    });

                } catch (error) {
                    console.error('Erreur lors de la récupération:', error);
                    tableBody.innerHTML = `<tr><td colspan="4" style="color: red;">Erreur: ${error.message}</td></tr>`;
                }
            }

            updateBtn.addEventListener('click', fetchAndUpdateUsers);
            
            // Optionnel : charge les données une première fois au chargement de la page
            // fetchAndUpdateUsers(); 
        });
    </script>

</body>
</html>