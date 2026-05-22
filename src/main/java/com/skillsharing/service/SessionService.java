package com.skillsharing.service;

import com.skillsharing.model.Session;
import com.skillsharing.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class SessionService {

    private static final Logger logger = Logger.getLogger(SessionService.class.getName());

    @Autowired
    private SessionRepository sessionRepository;

    public Session createSession(Session session) {
        logger.info("=== CREATING NEW SESSION ===");
        logger.info("Session type: " + session.getSessionType());
        logger.info("Teacher ID: " + session.getTeacherId());
        logger.info("Learner ID: " + session.getLearnerId());

        session.setStatus("scheduled");

        Session savedSession = sessionRepository.save(session);
        logger.info("Session saved with ID: " + savedSession.getId());

        return savedSession;
    }

    public Optional<Session> findById(Long id) {
        return sessionRepository.findById(id);
    }

    public List<Session> getAllSessions() {
        return sessionRepository.findAll();
    }

    public List<Session> getSessionsByTeacher(Long teacherId) {
        return sessionRepository.findByTeacherId(teacherId);
    }

    public List<Session> getSessionsByLearner(Long learnerId) {
        return sessionRepository.findByLearnerId(learnerId);
    }

    public Session updateSessionStatus(Long id, String status) {
        Optional<Session> sessionOpt = sessionRepository.findById(id);
        if (sessionOpt.isPresent()) {
            Session session = sessionOpt.get();
            session.setStatus(status);
            return sessionRepository.save(session);
        }
        return null;
    }

    public Session updateSession(Long id, Session updatedSession) {
        Optional<Session> existingSessionOpt = sessionRepository.findById(id);
        if (!existingSessionOpt.isPresent()) {
            throw new RuntimeException("Session not found with ID: " + id);
        }

        Session existingSession = existingSessionOpt.get();

        if (updatedSession.getScheduledTime() != null) {
            existingSession.setScheduledTime(updatedSession.getScheduledTime());
        }
        if (updatedSession.getDuration() != null) {
            existingSession.setDuration(updatedSession.getDuration());
        }
        if (updatedSession.getStatus() != null) {
            existingSession.setStatus(updatedSession.getStatus());
        }
        if (updatedSession.getLocation() != null) {
            existingSession.setLocation(updatedSession.getLocation());
        }

        return sessionRepository.save(existingSession);
    }

    public void deleteSession(Long id) {
        Optional<Session> sessionOpt = sessionRepository.findById(id);
        if (!sessionOpt.isPresent()) {
            throw new RuntimeException("Session not found with ID: " + id);
        }
        sessionRepository.deleteById(id);
    }

    public List<Session> getSessionsByStatus(String status) {
        return sessionRepository.findByStatus(status);
    }

    public List<Session> getUpcomingSessionsForUser(Long userId) {
        List<Session> teacherSessions = sessionRepository.findByTeacherId(userId);
        List<Session> learnerSessions = sessionRepository.findByLearnerId(userId);

        teacherSessions.addAll(learnerSessions);

        return teacherSessions.stream()
                .filter(s -> "scheduled".equals(s.getStatus()) || "confirmed".equals(s.getStatus()))
                .sorted((s1, s2) -> s1.getScheduledTime().compareTo(s2.getScheduledTime()))
                .collect(Collectors.toList());
    }
}
