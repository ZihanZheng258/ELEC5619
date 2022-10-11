package com.elec5619.student.forum.pojos;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity
@Table
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class Notice {
    @Id
    @GeneratedValue
    private int id;

    @Column(name = "content")
    private String content;

    @Column(name = "create_date")
    @CreatedDate
    private Date createDate = new Date();

    @Column(name = "have_read")
    private int haveRead = 0;

    @ManyToOne(targetEntity = User.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    @JsonIgnore
    private User sender;

    @ManyToOne(targetEntity = User.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id")
    @JsonIgnore
    private User receiver;

    @Transient
    private User JsonSender;

    @Transient
    private User JsonReceiver;

    @Transient
    private int senderID;

    @Transient
    private int receiverID;

}
