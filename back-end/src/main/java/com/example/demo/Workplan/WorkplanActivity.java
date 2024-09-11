//Workplan Activity Model - Create/Update a table 'Worklplan' in MySQL 'cycle' DB
package com.example.demo.Workplan;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="workplan")
public class WorkplanActivity {
    @Id
    private String activityNo;
    private String activityName;
    private boolean y1_q1=false;
    private boolean y1_q2=false;
    private boolean y1_q3=false;
    private boolean y1_q4=false;
    private boolean y2_q1=false;
    private boolean y2_q2=false;
    private boolean y2_q3=false;
    private boolean y2_q4=false;
    private boolean y3_q1=false;
    private boolean y3_q2=false;
    private boolean y3_q3=false;
    private boolean y3_q4=false;


    @Override
    public String toString() {
        return "WorkplanActivity{" +
                "activityNo='" + activityNo + '\'' +
                ", activityName='" + activityName + '\'' +
                ", Y1_q1=" + y1_q1 +
                ", y1_q2=" + y1_q2 +
                ", y1_q3=" + y1_q3 +
                ", y1_q4=" + y1_q4 +
                ", y2_q1=" + y2_q1 +
                ", y2_q2=" + y2_q2 +
                ", y2_q3=" + y2_q3 +
                ", y2_q4=" + y2_q4 +
                ", y3_q1=" + y3_q1 +
                ", y3_q2=" + y3_q2 +
                ", y3_q3=" + y3_q3 +
                ", y3_q4=" + y3_q4 +
                '}';
    }
}

