package com.PEIN.projection;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@JsonInclude(JsonInclude.Include.NON_NULL)
public interface LovProjection extends Serializable {

    String getCode();
    String getDescription();
    String getChamp1();

    String getChamp2();
    String getChamp3();
    String getChamp4();
    String getChamp5();
    String getChamp6();
    String getChamp7();
    String getChamp8();
    String getNom();
    List<Object> getList();
    Object getObj();
    String getId();
    String getTitre();
    String getCreationUser();
    LocalDateTime getCreationDate();
    LocalDate getDateTicket();
    String getUserId();
    String getTypeTicketId();
    String getPrioriteId();
    String getStatutTicketId();
    String getInstitutionId();
    LocalDate getDateAssignation();
    LocalDate getDateResolution();
    String getRatingId();




    @JsonFormat(pattern = "dd/MMM/YYYY")
    LocalDate getChampDate();

}
