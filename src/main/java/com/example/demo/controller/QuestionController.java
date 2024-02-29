package com.example.demo.controller;

import com.example.demo.model.Question;
import com.example.demo.model.Reply;
import com.example.demo.model.User;
import com.example.demo.service.QuestionService;
import com.example.demo.service.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @Autowired
    private ReplyService replyService;


    @GetMapping("/question")
    public List<Question> getQuestion() {
        return questionService.getRecentQuestions();
//
//        if (question.isPresent()) {
//            Map<String, Object> response = new HashMap<>();
//            response.put("id", question.get().getId());
//            response.put("content", question.get().getContent());
//            response.put("createdDate", question.get().getCreatedDate());
//
//            // Include user information if available
//            if (question.get().getUser() != null) {
//                response.put("user", getUserResponse(question.get().getUser()));
//            }
//
//            System.out.println("Question found: " + response);
//            return new ResponseEntity<>(response, HttpStatus.OK);
//        } else {
//            System.out.println("Question not found for ID: " + questionId);
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
    }

    @PostMapping
    public ResponseEntity<Question> createQuestion(@RequestBody Question question) {
        question.setCreatedDate(new Date());
        Question savedQuestion = questionService.saveQuestion(question);
        return new ResponseEntity<>(savedQuestion, HttpStatus.CREATED);
    }
    private Map<String, Object> getUserResponse(User user) {
        Map<String, Object> userResponse = new HashMap<>();
        userResponse.put("id", user.getId());
        userResponse.put("name", user.getName());
        userResponse.put("email", user.getEmail());
        return userResponse;
    }

    @DeleteMapping("/question/{questionId}")
    String deleteQuestion(@PathVariable Long questionId) {
        Optional<Question> question = questionService.getQuestionById(questionId);

        if (question.isPresent()) {
            // Delete associated replies first
            List<Reply> replies = replyService.getRepliesByQuestion(questionId);
            for (Reply reply : replies) {
                replyService.deleteReply(reply.getId());
            }

            // Then delete the question
            questionService.deleteQuestion(questionId);

            return "Question and associated replies deleted successfully";
        } else {
            return "Question not found for ID: ";
        }
    }
}
