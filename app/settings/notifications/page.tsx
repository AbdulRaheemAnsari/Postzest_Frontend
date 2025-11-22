"use client";
import NotificationToggle from "@/components/common/NotificationToggle";

const Notifications = () => {
  const handleNotificationChange = (title: string, enabled: boolean) => {
    console.log(`${title} notification ${enabled ? "enabled" : "disabled"}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-xl sm:text-3xl font-semibold text-foreground mb-8 md:mb-12">
          Notifications
        </h1>

        <div className="bg-card rounded-lg">
          <div className="">
            <NotificationToggle
              title="Published Post Confirmations"
              description="Receive an email for any post that is successfully published to one of your channels."
              defaultEnabled={true}
              onChange={(enabled) =>
                handleNotificationChange(
                  "Published Post Confirmations",
                  enabled
                )
              }
            />

            <NotificationToggle
              title="Comments"
              description="These are notifications for comments on your posts and replies to your comments."
              defaultEnabled={true}
              onChange={(enabled) =>
                handleNotificationChange("Comments", enabled)
              }
            />

            <NotificationToggle
              title="Daily Post Recap"
              description="Receive a daily email reviewing the previous day's posts and upcoming scheduled posts."
              defaultEnabled={false}
              onChange={(enabled) =>
                handleNotificationChange("Daily Post Recap", enabled)
              }
            />

            <NotificationToggle
              title="Post Failures"
              description="An email if a post in your queue fails to be published."
              defaultEnabled={false}
              onChange={(enabled) =>
                handleNotificationChange("Post Failures", enabled)
              }
            />

            <NotificationToggle
              title="Reminders"
              description="Receive reminders to post and build a consistent content creation habit with PostZest."
              defaultEnabled={true}
              onChange={(enabled) =>
                handleNotificationChange("Reminders", enabled)
              }
            />

            <NotificationToggle
              title="Channel Connection Updates"
              description="Emails about your connected channels. For example, when a channel is disconnected."
              defaultEnabled={true}
              onChange={(enabled) =>
                handleNotificationChange("Channel Connection Updates", enabled)
              }
            />

            <NotificationToggle
              title="Billing and Payment Reminders"
              description="Emails relating to billing and payment reminders"
              defaultEnabled={true}
              onChange={(enabled) =>
                handleNotificationChange(
                  "Billing and Payment Reminders",
                  enabled
                )
              }
            />
          </div>
          <div className="mt-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">
              From PostZest
            </h2>

            <div className="bg-card rounded-lg">
              <div className="">
                <NotificationToggle
                  title="PostZest Product Updates & News"
                  description="Get the latest PostZest updates, new features, improvements, and announcements to help you schedule smarter and grow faster."
                  defaultEnabled={true}
                  onChange={(enabled) =>
                    handleNotificationChange(
                      "PostZest Product Updates & News",
                      enabled
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
