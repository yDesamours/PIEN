package PEIN.java.pojos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Membre {
    private String id;
    private String nom;
    private String prenom;
    private String role;
}
