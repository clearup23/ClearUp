package com.example.demo.controller;

import com.example.demo.model.Reply;
import com.example.demo.service.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/replies")
public class ReplyController {

    @Autowired
    private ReplyService replyService;

    @GetMapping
    public ResponseEntity<List<Reply>> getAllReplies() {
        List<Reply> replies = replyService.getAllReplies();
        return new ResponseEntity<>(replies, HttpStatus.OK);
    }
    @GetMapping("/{questionId}")
    public ResponseEntity<List<Reply>> getRepliesByQuestion(@PathVariable Long questionId) {
        List<Reply> replies = replyService.getRepliesByQuestion(questionId);
        return new ResponseEntity<>(replies, HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<Reply> postReply(@RequestBody Reply reply) {
        reply.setCreatedDate(new Date());
        Reply savedReply = replyService.saveReply(reply);
        return new ResponseEntity<>(savedReply, HttpStatus.CREATED);
    }
}

