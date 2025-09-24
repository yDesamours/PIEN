package PEIN.java.pojos;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Programme {
    private Long id;
    private Long programmeId;
    private String nom;
    private LocalDateTime creeLe;
    private LocalDateTime supprimeLe;
}
