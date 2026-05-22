package com.skillsharing.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Session {
    private Long id;
    private Long teacherId;
    private Long learnerId;
    private Long skillId;
    private OffsetDateTime scheduledTime;
    private Integer duration; // in minutes
    private String status; // scheduled, in_progress, completed, cancelled
    private String location;
    private String sessionType; // in_person, virtual
    private String meetingUrl;
    private String meetingId;
    private String meetingPassword;
    private String notes; // Additional session notes
}
