package com.Sigmur.Workflow.controller;

import com.Sigmur.Workflow.dto.ApiMessageResponse;
import com.Sigmur.Workflow.service.WorkflowService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/workflow")
@RequiredArgsConstructor
public class WorkflowController {

    private final WorkflowService workflowService;

    @GetMapping("/ping")
    public ApiMessageResponse ping() {
        return workflowService.ping();
    }
}
package com.Sigmur.Workflow.controller;

import com.Sigmur.Workflow.dto.ApiMessageResponse;
import com.Sigmur.Workflow.service.WorkflowService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/workflow")
@RequiredArgsConstructor
public class WorkflowController {

    private final WorkflowService workflowService;

    @GetMapping("/ping")
    public ApiMessageResponse ping() {
        return workflowService.ping();
    }
}
